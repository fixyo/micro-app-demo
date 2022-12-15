import { defineComponent, PropType, computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import path from 'path'
import { isTemplateNode } from 'vue/node_modules/@vue/compiler-core'

import '../../style/sidebarItem.scss'

const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: {
    menu: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => {}
    },
    basePath: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: [],
  components: {},

  setup(props, ctx) {
    return () => (
      <>
        {props.menu.children?.length === 1 ? (
          <el-menu-item index={props.menu.children[0].path}>
            {/* <div>{item.meta?.title}</div> */}
            <div class="menu-item-view">
              <svg class="icon" font-size="16px" aria-hidden="true">
                <use xlinkHref={props.menu.children[0].meta?.icon} />
              </svg>
              <span class="menu-item-label ellipsis">{props.menu.children[0].meta?.title}</span>
            </div>
          </el-menu-item>
        ) : (
          <el-sub-menu index={props.menu.path}>
            {{
              title: () => {
                // return props.menu.meta?.title
                return (
                  <div class="menu-item-view">
                    <svg class="icon" font-size="16" aria-hidden="true">
                      <use xlinkHref={props.menu.meta?.icon} />
                    </svg>
                    <span class="menu-item-label">{props.menu.meta?.title}</span>
                  </div>
                )
              },
              default: () => {
                return props.menu.children?.map((item) => {
                  if (item.children) {
                    return <SidebarItem menu={item} basePath={item.path}></SidebarItem>
                  }
                  return (
                    <el-menu-item index={item.path}>
                      {/* <div>{item.meta?.title}</div> */}
                      <div class="menu-item-view">
                        <svg class="icon" font-size="16px" aria-hidden="true">
                          <use xlinkHref={item.meta?.icon} />
                        </svg>
                        <span class="menu-item-label">{item.meta?.title}</span>
                      </div>
                    </el-menu-item>
                  )
                })
              }
            }}
          </el-sub-menu>
        )}
      </>
    )
  }
})

export default SidebarItem
