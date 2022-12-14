<template>
  <section style="padding: 20px; color: red;">Vue App
    <div>user: {{userName}}</div>
    <div @click="() => updateUserInfo()">更新用户名</div>
  </section>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: "Home",
  computed: {
    userName() {
      return this.$store.state.common.user.name
    }
  },
  methods: {
    ...mapMutations('common', ['emitGlobalState']),
    ...mapActions('common', ['setGlobalState']),
    updateUserInfo() {
      const state = {user: {name: 'kkk' + Date.now()}}
      this.emitGlobalState(state)
    }
  }
}
</script>