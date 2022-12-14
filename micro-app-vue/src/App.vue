<template>
  <div id="app" style="height: 100%">
     <!-- <a-menu :selectedKeys="[currentRoute]" mode="horizontal" theme="dark">
      <a-menu-item 
        v-for="(item) in menus" 
        :key="item.key"
        >
        <router-link :to="item.route">{{item.title}}</router-link>
      </a-menu-item>
     </a-menu> -->
    <Layout v-if="!noLayout" style="height: 100%;" />
    <router-view :key="(new Date()).getTime()" v-if="noLayout" />
  </div>
</template>

<script>
import Layout from 'micro-app-common/src/components/layout'
export default {
  name: 'App',
  components: {
    Layout
  },
  data() {
    return {
      menus: [
        {
          key: "vue",
          route: "/",
          title: "主页"
        },
        {
          key: "vue-list",
          route: "/list",
          title: "列表页"
        },
        {
          key: "vue-communication",
          route: "/communication",
          title: "通讯页"
        },
        {
          key: "react",
          route: "/react",
          title: "React 子应用"
        }
      ],
      isQK: window.__POWERED_BY_QIANKUN__ 
    }
  },

  mounted() {
    console.log(this.$route, '=================')
  },

  computed: {
    currentRoute() {
      const menu = this.menus.find(item => item.route === this.$route.path)
      return menu ? menu.key : "vue";
    },
    noLayout() {
      if (this.isQK) return true 
      return this.$route.meta && this.$route.meta.noLayout
    }
  },
}
</script>

<style>
</style>
