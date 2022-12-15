import { defineComponent, onMounted, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/actions'
import SelectLang from '@/components/SelectLang/SelectLang'
import './style/threeLogin.scss'
import { useRouter } from 'vue-router'
import { L2Dwidget } from 'live2d-widget'
import * as THREE from 'three'
import skyPng from '@/assets/images/sky.png'
import earthPng from '@/assets/images/earth_bg.png'
import cloudPng from '@/assets/images/cloud.png'
import flake1Png from '@/assets/images/starflake1.png'
import flake2Png from '@/assets/images/starflake2.png'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { random } from 'lodash'

const skyBg = new URL('../../../assets/images/sky.png', import.meta.url).href

export default defineComponent({
  props: {},
  emits: [],
  components: {},

  setup(props, ctx) {
    const loginParams = ref({
      password: 'admin',
      username: 'admin'
    })
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()

    const doLogin = async () => {
      if (!loginParams.value.password || !loginParams.value.username)
        return ElMessage.warning(t('login.emptyHint'))

      const success = await store.dispatch(UserActionTypes.ACTION_LOGIN, loginParams.value)

      if (success) {
        router.push({ name: 'Dashboard' })
      }
    }

    let scene: any
    let container: HTMLElement | null
    let width: number
    let height: number
    // 盒模型深度
    let depth = 1400
    let zAxisNumber: number
    let camera: any
    let cameraTarget: any = new THREE.Vector3(0, 0, 0)
    let renderer: any
    let stats: any = new Stats()
    // 声明球组
    let sphereGroup: any
    // 声明球体几何
    let sphereGeometry: any
    // 声明完整球
    let sphere: any
    // 云运动函数
    let cloudOneMoveFn: () => void
    let cloudTwoMoveFn: () => void

    const initContainer = () => {
      container = document.getElementById('three-login-container')
      width = container?.clientWidth
      height = container?.clientHeight
    }
    const initSence = () => {
      scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x000000, 0, 10000)
    }
    const initSenceBg = () => {
      new THREE.TextureLoader().load(skyBg, (texture) => {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
        const mesh = new THREE.Mesh(geometry, material)
        // console.log(mesh, 'mesh')
        console.log(skyPng, 'mesh')
        scene.add(mesh)
      })
    }
    const initCamera = () => {
      // 固定视域角度
      const fov = 15
      const distance = width / 2 / Math.tan(Math.PI / 12)
      zAxisNumber = Math.floor(distance - depth / 2)
      camera = new THREE.PerspectiveCamera(fov, width / height, 1, 30000)
      camera.position.set(0, 0, zAxisNumber)
      camera.lookAt(cameraTarget)
    }

    const initLight = () => {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      // 右下角点光源
      const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0)
      light_rightBottom.position.set(0, 100, -200)
      scene.add(light_rightBottom)
      scene.add(ambientLight)
    }
    const initRenderer = () => {
      // 抗锯齿
      // alpha - whether the canvas contains an alpha (transparency) buffer or not. Default is false.
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.appendChild(renderer.domElement)
      container.appendChild(stats.dom)
    }

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const initSphereMesh = () => {
      const material = new THREE.MeshPhongMaterial()
      material.map = new THREE.TextureLoader().load(earthPng)
      material.blendDstAlpha = 1
      sphereGeometry = new THREE.SphereGeometry(50, 64, 32)
      sphere = new THREE.Mesh(sphereGeometry, material)
    }

    const initSphereGroup = () => {
      sphereGroup = new THREE.Group()
      sphereGroup.add(sphere)
      sphereGroup.position.set(-300, 200, -300)
      scene.add(sphereGroup)
    }

    const sphereAutoRotate = () => {
      if (sphere) {
        // sphereGroup.rotateY(0.01)
        sphereGroup.rotation.y += 0.01
      }
    }

    console.log(new THREE.Vector3(1, 3, 4))

    const initCloudMesh = (
      route: THREE.Vector3[],
      geometryWidth: number,
      geometryHeight: number
    ) => {
      // 生成catmull-rom曲线
      const curve = new THREE.CatmullRomCurve3(route)
      // param1， 根据曲线生成一条管道 （第一个参数，curve）
      // param2，The number of segments that make up the tube, default is 64（管道分成多少段）
      // param3, The radius of the tube, default is 1（管道的半径）
      // param4, The number of segments that make up the cross-section, default is 8 （管道口分成多少段，即管道口是几边形）
      // param5,  Is the tube open or closed, default is false （是否闭合管道，首尾相接的意思）

      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false)
      const tubeMatrial = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true })
      const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMatrial)
      scene.add(tubeMesh)

      const cloudGeometry = new THREE.PlaneGeometry(geometryWidth, geometryHeight)
      const textureLoader = new THREE.TextureLoader()
      const cloudTexture = textureLoader.load(cloudPng)
      const cloudMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      })
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
      scene.add(cloudMesh)

      return {
        cloudMesh,
        curve
      }
    }

    const getCloudMoveFn = (
      cloudInfo: { cloudMesh: THREE.Mesh; curve: THREE.CatmullRomCurve3 },
      speed: number,
      scaleSpeed = 0.0006,
      maxScale = 1,
      startScale = 0
    ) => {
      let cloudProgess = 0
      return () => {
        if (startScale < maxScale) {
          startScale += scaleSpeed
          cloudInfo.cloudMesh.scale.setScalar(startScale)
        }
        if (cloudProgess <= 1) {
          cloudProgess += speed
          if (cloudInfo.curve) {
            const point = cloudInfo.curve.getPoint(cloudProgess)
            if (point && point.x) {
              cloudInfo.cloudMesh.position.set(point.x, point.y, point.z)
            }
          }
        } else {
          cloudProgess = 0
          startScale = 0
        }
      }
    }

    const textureLoader = new THREE.TextureLoader()

    let parameters: any
    let materials: any[] = []
    const initStarts = (zPosition: number) => {
      const geometry = new THREE.BufferGeometry()
      const vertices: number[] = []
      const pointsGeometry: any[] = []
      const flake1Texture = textureLoader.load(flake1Png)
      const flake2Texture = textureLoader.load(flake2Png)
      parameters = [
        [{ h: 0.6, s: 100, l: 0.75 }, flake1Texture, 50],
        [{ h: 0, s: 0, l: 1 }, flake2Texture, 20]
      ]

      for (let i = 0; i < 500; i++) {
        const x = THREE.MathUtils.randFloatSpread(width)
        const y = random(0, height / 2)
        const z = random(-depth / 2, zAxisNumber)
        vertices.push(x, y, z)
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

      parameters.forEach((item: any, index: number) => {
        const color = item[0]
        const texture = item[1]
        const size = item[2]

        materials[index] = new THREE.PointsMaterial({
          map: texture,
          size,
          blending: THREE.AdditiveBlending,
          depthTest: true,
          transparent: true
        })
        materials[index].color.setHSL(color.h, color.s, color.l)
        const particles = new THREE.Points(geometry, materials[index])
        particles.position.setZ(zPosition)
        const rotateDeg = Math.random() * 0.2 - 0.15
        particles.rotation.set(rotateDeg, rotateDeg, rotateDeg)
        pointsGeometry.push(particles)
        scene.add(particles)
      })
      return pointsGeometry
    }
    let zProgress = -700
    const startMove = () => {
      zProgress += 1
      const maxZprogress = zAxisNumber + depth / 2
      // console.log(maxZprogress, 'max')
      if (zProgress < maxZprogress) {
        startsOne.forEach((item) => {
          // console.log(zProgress)
          item.position.setZ(zProgress)
        })
      } else {
        zProgress = -700
      }
      const time = Date.now() * 0.00005
      materials.forEach((item, index) => {
        const color = parameters[index][0]
        // console.log(color)
        const h = ((360 * (color.h + time)) % 360) / 360
        item.color.setHSL(color.h, color.s, parseFloat(h.toFixed(2)))
      })
    }

    const animate = () => {
      sphereAutoRotate()
      cloudOneMoveFn()
      cloudTwoMoveFn()
      startMove()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    const initL2Dwidget = () => {
      L2Dwidget.init({
        model: {
          jsonPath: 'https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json'
        },
        display: {
          position: 'left',
          width: 75,
          height: 150,
          hOffset: 0,
          vOffset: -20
        }
      })
    }

    let cloudOne: { cloudMesh: THREE.Mesh; curve: THREE.CatmullRomCurve3 }
    let cloudTwo: { cloudMesh: THREE.Mesh; curve: THREE.CatmullRomCurve3 }
    let startsOne: any
    onMounted(() => {
      // three
      initContainer()
      initSence()
      initSenceBg()
      initCamera()
      initLight()
      initSphereMesh()
      initSphereGroup()
      cloudOne = initCloudMesh(
        [
          new THREE.Vector3(-width / 10, 0, -depth / 2),
          new THREE.Vector3(-width / 4, height / 8, 0),
          new THREE.Vector3(-width / 4, 0, zAxisNumber)
        ],
        400,
        200
      )
      cloudTwo = initCloudMesh(
        [
          new THREE.Vector3(width / 8, height / 8, -depth / 2),
          new THREE.Vector3(width / 8, height / 8, zAxisNumber)
        ],
        200,
        100
      )

      cloudOneMoveFn = getCloudMoveFn(cloudOne, 0.0002)
      cloudTwoMoveFn = getCloudMoveFn(cloudTwo, 0.0008, 0.0008)

      startsOne = initStarts(zProgress)

      initRenderer()

      // setTimeout(() => {
      //   renderer.render(scene, camera)
      // }, 500)
      animate()

      window.addEventListener('resize', handleResize)
      initL2Dwidget()
    })

    return () => (
      <div class="login">
        <div id="three-login-container"></div>
        <div class="login-ground"></div>
      </div>
    )
  }
})
