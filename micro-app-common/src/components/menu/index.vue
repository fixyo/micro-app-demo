<template>
  <section class="cns-main-menu">
    <a-menu mode="inline" theme="dark" :selectedKeys="[selectKey]">
      <a-menu-item v-for="item in menus" :key="item.key" @click="changeMenu(item)">
        <router-link :to="{path: item.path }">
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{item.title}}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </section>
</template>

<script>
// import { Component, Vue, Watch } from "vue-property-decorator";
import actions from "@/shared/actions";
import store from '@/store'

export default  {
  data() {
    return {
      selectKey: ''
    }
  },

  created() {
    this._initMenus();
  },

  computed: {
    userName() {
      return actions.getGlobalState('user').name
    },
    menus () {
      return store.state?.common?.menu || []
    }
  },

  watch: {
    'menus'() {
      this._initMenus()
    },
    '$route.path': {
      handler() {
        this._initMenus()
      },
      immediate: true 
    }
  },

  methods: {
    _initMenus() {
      const currentMenu = this._findCurrentMenu(
        this.menus,
        this.$route.path
      ) 
      if (!currentMenu) return;
      const { key } = currentMenu;
      this.selectKey = key;
      console.log(key, 'selected')
    },
    _findCurrentMenu(menus,currentPath) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const { path } = menu;
        if (path === currentPath) return menu;

        const currentMenu = this._findCurrentMenu(
          menu.children || [],
          currentPath
        );
        if (currentMenu) return currentMenu;
      }
      return null;
    },
    changeMenu(item) {
      const { key } = item;
      this.selectKey = key;
    }
  }
}
</script>

<style lang="less" scoped>
.cns-main-menu {
  width: 100%;
 
  flex: 1;
  background: #001529;
  .cns-menu {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
  .cns-parent-title {
    font-size: 13px;
    color: rgba(233, 241, 255, 0.75);
  }
  .cns-child-title {
    font-size: 13px;
    color: #fff;
  }
  .cns-child-title:hover {
    color: #408fff;
  }
  /deep/ .cns-menu-sub {
    background: rgb(12, 28, 53);
  }
}
</style>