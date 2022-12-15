import { defineComponent } from 'vue'
import '../style/borderBox.scss'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  // emits: [],
  // components: {},
  setup(props, { slots }) {
    return () => (
      <div class="border-box">
        <div class="border-tl"></div>
        <div class="border-tr"></div>
        <div class="border-bl"></div>
        <div class="border-br"></div>
        {props.title ? <div class="border-title">{props.title}</div> : null}
        {slots.default ? slots.default() : null}
      </div>
    )
  }
})
