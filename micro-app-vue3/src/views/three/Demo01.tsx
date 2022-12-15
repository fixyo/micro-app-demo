import { defineComponent, ref, onMounted } from 'vue'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight
} from 'three'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const canvasRef = ref()

    const doInit = () => {
      // 创建渲染器
      const renderer = new WebGLRenderer({ canvas: canvasRef.value })

      // 创建镜头
      // 透视投影相机
      // PerspectiveCamera()中有四个参数
      // 1、fov(field of view), 可选参数，默认50，垂直方向上的角度，该值是度数而不是弧度
      // 2、aspect，可选参数，默认值1，画布的宽高比。
      // 3、near，可选参数，默认为0.1，近平面，限制摄像机可绘制的最近距离，若小于该距离则不会绘制（被才切掉）
      // 4、far，可选参数，默认值为2000，远平面，限制摄像机和绘制的最远距离，若超过该距离则不会绘制
      // 以上四个参数放在一起，构成了一个视锥。
      const camera = new PerspectiveCamera(30, 2, 0.1, 500)

      // 创建场景(放置所有物体的空间容器，对应现实的三维空间)
      const scene = new Scene()

      // 创建几何体
      const geometry = new BoxGeometry(50, 50, 50)

      // 创建材质
      // 让立方体能够反光，所以不能用MeshBasicMaterial，而是改用MeshPhongMaterial
      const material0 = new MeshPhongMaterial({ color: 0x44aa88 })
      const material1 = new MeshPhongMaterial({ color: 0xc50d0d })
      const material2 = new MeshPhongMaterial({ color: 0x39b20a })

      // 创建网格
      const cube0 = new Mesh(geometry, material0)
      cube0.position.x = -100
      scene.add(cube0)

      const cube1 = new Mesh(geometry, material1)
      cube1.position.x = 0
      scene.add(cube1)

      const cube2 = new Mesh(geometry, material2)
      cube2.position.x = 100
      scene.add(cube2)

      // 创建光源
      const light = new DirectionalLight(0xffffff, 1)
      light.position.set(-1, 2, 4)
      scene.add(light) // 将光源添加到场景中，若场景中没有光源，则可反光材质的物体渲染出的结果是一片漆黑

      // 设置透视镜头的z轴距离，以便我们以某个距离来观察几何体
      // 之前初始化透视镜头时，设置的近平面为0.1，远平面为5
      // camera.position.z的值一定要在0.1-5的范围内，超出这个范围则不会被渲染
      camera.position.z = 460

      const render = (time: number) => {
        time = time * 0.001
        cube0.rotation.x = time
        cube0.rotation.y = time
        cube1.rotation.x = time
        cube1.rotation.y = time
        cube2.rotation.x = time
        cube2.rotation.y = time
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    }

    onMounted(() => {
      doInit()
    })

    return () => (
      <div class="app-main">
        <canvas style="width: 100%; height: 100%;" ref={canvasRef}></canvas>
      </div>
    )
  }
})
