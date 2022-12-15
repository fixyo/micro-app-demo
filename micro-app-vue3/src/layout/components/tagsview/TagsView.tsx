import { defineComponent, watch, onBeforeMount, withModifiers } from 'vue'
import ScrollPane from './ScrollPane'
import '../../style/tagsview.scss'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { TagsviewActions } from '@/store/modules/tagViews/actions'
import { MutationTypes } from '@/store/modules/tagViews/mutations'
import { TagView } from '@/store/modules/tagViews/state'

export default defineComponent({
  setup(props, ctx) {
    const currentRoute = useRoute()
    const router = useRouter()
    const store = useStore()

    watch(currentRoute, () => {
      addTag()
    })

    const addTag = () => {
      if (currentRoute.name) {
        store.dispatch(TagsviewActions.ADD_VISITED_VIEW_ACTION, currentRoute)
      }
    }

    const closeTag = (e: MouseEvent, view: TagView, index: number) => {
      // e.stopPropagation()

      store.commit(MutationTypes.DEL_VISITED_VIEW, view)
      if (view.path === currentRoute.path) {
        toPreviousTag(index)
      }
    }

    const toPreviousTag = (index: number) => {
      const previousTag = store.state.tagsview.visitedViews[index - 1]
      if (previousTag && previousTag.path) {
        router.push(previousTag.path)
      }
    }

    const toPages = (route: TagView) => {
      if (route.path) {
        router.push(route.path)
      }
    }

    onBeforeMount(() => {
      addTag()
    })

    return () => (
      <div class="tagsview-container">
        <ScrollPane>
          <div class="tagsview-inner">
            {store.state.tagsview.visitedViews.map((item, index) => {
              return (
                <div class={['tagsview-item', currentRoute.path === item.path ? 'is-active' : '']}>
                  <span class="tagsview-title ellipsis" onClick={() => toPages(item)}>
                    {item.title}
                  </span>
                  {store.state.tagsview.visitedViews.length === 1 ? null : (
                    <span
                      class="el-icon-close"
                      onClick={withModifiers(
                        (e: MouseEvent) => closeTag(e, item, index),
                        ['self', 'prevent']
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </ScrollPane>
      </div>
    )
  }
})
