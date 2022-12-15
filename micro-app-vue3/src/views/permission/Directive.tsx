import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    return () => <div>anyone can access</div>
  }
})
