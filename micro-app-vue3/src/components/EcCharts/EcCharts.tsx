import { defineComponent, ref, onMounted, onBeforeUnmount, watch, PropType } from 'vue'
import 'echarts-liquidfill/src/liquidFill.js'
import * as echarts from 'echarts'

export type TAnyFunction = (...args: any[]) => void
export const debounce = (fn: TAnyFunction, delay: number) => {
  let timer: any = null
  return function () {
    let context: any = undefined
    let args = [...arguments]
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
export default defineComponent({
  props: {
    options: {
      type: Object as any,
      default: () => ({})
    }
  },

  setup(props, ctx) {
    const chartDom = ref()

    const resize = debounce(() => {
      chartInstance.value?.resize()
    }, 300)

    const chartInstance = ref<echarts.ECharts | null>(null)

    watch(
      () => props.options,
      (newVal) => {
        console.log(newVal, 'option change')
        chartInstance.value?.setOption(newVal)
      }
    )

    onMounted(() => {
      chartInstance.value = echarts.init(chartDom.value)
    })

    window.addEventListener('resize', resize)
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resize)
      chartInstance.value?.dispose()
      chartInstance.value = null
    })

    return () => <div ref={chartDom} style="width: 100%; height: 100%;"></div>
  }
})
