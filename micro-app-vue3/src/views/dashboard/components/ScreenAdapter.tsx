import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from '@/components/EcCharts/EcCharts'
import '../style/screenAdaptor.scss'

export default defineComponent({
  props: {
    designWidth: {
      type: Number,
      default: 1920
    },
    designHeight: {
      type: Number,
      default: 1080
    }
  },

  setup(props, { slots }) {
    const contentStyle = ref({
      width: props.designWidth + 'px',
      transform: 'scale(1) translate3d(-50%, -50%, 0) translateZ(0)'
    })

    const setScale = () => {
      const scale = getScale()
      contentStyle.value.width = `${containerRef.value.clientWidth / scale}px`
      contentStyle.value.transform = `scale(${scale}) translate3d(-50%, -50%, 0) translateZ(0)`
    }

    const containerRef = ref()
    const getScale = () => {
      // const clientWidth = document.documentElement.clientWidth
      // const clientHeight = document.documentElement.clientHeight
      const clientWidth = containerRef.value.clientWidth
      const clientHeight = containerRef.value.clientHeight

      // console.log(clientHeight, clientWidth)

      const realRatio = clientWidth / clientHeight
      const designRatio = props.designWidth / props.designHeight

      const scaleRate =
        //  宽屏，按照高度比值缩放
        realRatio > designRatio
          ? clientHeight / props.designHeight
          : clientWidth / props.designWidth
      return scaleRate
    }

    const handleResize = debounce(() => {
      setScale()
    }, 300)

    onMounted(() => {
      setScale()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return () => (
      <div class="screen-adaptor" ref={containerRef}>
        <div class="screen-adaptor-content" style={contentStyle.value}>
          {slots.default ? slots.default() : null}
        </div>
        <div class="screen-adaptor-bg">{slots.bg ? slots.bg() : null}</div>
      </div>
    )
  }
})
