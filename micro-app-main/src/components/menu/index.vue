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

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import actions from "@/shared/actions";
import store from '@/store'

type MenuItem = {
  key: string;
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
};

@Component
export default class Menu extends Vue {
  // menus: MenuItem[] = [
  //   {
  //     key: "Home",
  //     title: "主页",
  //     path: "/"
  //   },
  //   {
  //     key: "Vue",
  //     title: "Vue 子应用",
  //     path: "/vue"
  //   },
  //   {
  //     key: "Vue1",
  //     title: "Vue1 子应用",
  //     path: "/angular"
  //   },
  //   {
  //     key: "React",
  //     title: "React 子应用",
  //     path: "/react"
  //   },
  //   {
  //     key: "VueList",
  //     title: "Vue 列表页",
  //     path: "/vue/list"
  //   },
  //   {
  //     key: "ReactList",
  //     title: "React 列表页",
  //     path: "/react/list"
  //   },
  //   {
  //     key: "MainCommunication",
  //     title: "主应用通讯页",
  //     path: "/communication"
  //   },
  //   {
  //     key: "VueCommunication",
  //     title: "Vue 通讯页",
  //     path: "/vue/communication"
  //   },
  //   {
  //     key: "ReactCommunication",
  //     title: "React 通讯页",
  //     path: "/react/communication"
  //   },
  //   // Angular 应用暂时未接入
  //   // {
  //   //   key: "Angular",
  //   //   title: "Angular 子应用",
  //   //   path: "/angular"
  //   // },
  //   // {
  //   //   key: "AngularList",
  //   //   title: "Angular 列表页",
  //   //   path: "/angular/list"
  //   // },
  //   // {
  //   //   key: "AngularCommunication",
  //   //   title: "Angular 通讯页",
  //   //   path: "/angular/communication"
  //   // }
  // ];

  selectKey: string = "";

  created() {
    this._initMenus();
  }

  get userName () {
    return actions.getGlobalState('user').name
  }

  get menus () {
    return store.state?.common?.menu || []
  }
  
  @Watch('menus')
  onMenuChanged() {
    this._initMenus()
  }

  @Watch('$route.path', { immediate: true })
  onRoutePathChanged() {
    this._initMenus()
  }

  private _initMenus() {
    const currentMenu = this._findCurrentMenu(
      this.menus,
      this.$route.path
    ) as MenuItem;
    if (!currentMenu) return;
    const { key } = currentMenu;
    this.selectKey = key;
    console.log(key, 'selected')
  }

  private _findCurrentMenu(
    menus: MenuItem[],
    currentPath: string
  ): MenuItem | null {
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
  }

  /**
   * 切换菜单
   */
  private changeMenu(item: MenuItem) {
    const { key } = item;
    this.selectKey = key;
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