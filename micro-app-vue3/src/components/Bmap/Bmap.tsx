import { defineComponent, onMounted, ref } from 'vue'
import styleJson from './style.json'

import './style/bmap.scss'

const Bmap = defineComponent({
  name: 'Bmap',

  // props: {},

  setup(props, ctx) {
    const mapInstance = ref<any>(null)

    const init = () => {
      mapInstance.value = new window.BMapGL.Map('bmap')
      mapInstance.value.setMapStyleV2({ styleJson: styleJson })
      const point = new window.BMapGL.Point(118.803572, 32.062449)
      mapInstance.value.centerAndZoom(point, 12)
      mapInstance.value.enableScrollWheelZoom(true)
      // mapInstance.value.setHeading(64.5)
      // mapInstance.value.setTilt(73)
      // let bd = new window.BMapGL.Boundary()
      // bd.get('', function (rs) {
      //   console.log(rs)
      // })
      const marker = new window.BMapGL.Marker(point)
      mapInstance.value.addOverlay(marker)
      // 创建信息窗口
      const opts = {
        width: 200,
        height: 100,
        title: '故宫博物院'
      }
      const infoWindow = new window.BMapGL.InfoWindow(
        '地址：北京市东城区王府井大街88号乐天银泰百货八层',
        opts
      )
      marker.addEventListener('click', () => {
        mapInstance.value.openInfoWindow(infoWindow, point)
      })
    }

    onMounted(() => {
      init()
    })
    return () => (
      <div class="app-map">
        <div class="app-content" id="bmap"></div>
      </div>
    )
  }
})

export default Bmap
