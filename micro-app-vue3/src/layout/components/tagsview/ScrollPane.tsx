import { defineComponent, ref } from 'vue'

export default defineComponent({
  // props: {},
  // emits: [],
  // components: {},
  setup(props, { slots }) {
    const scrollBarRef = ref()
    let offset = 0
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      offset += (e as any).wheelDelta || e.deltaY
      scrollBarRef.value.setScrollLeft(offset)
    }
    return () => (
      <el-scrollbar ref={scrollBarRef} onWheel={handleWheel} vertical={false}>
        {slots.default ? slots.default() : null}
      </el-scrollbar>
    )
  }
})
