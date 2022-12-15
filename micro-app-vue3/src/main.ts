import { createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import { usePlugins } from '@/plugins'
import '@/utils/setRootFontSize'

import App from './utils/App'
import router from './router'
import { store } from './store'
import '@/assets/iconfont/iconfont.css'
import 'normalize.css'
import '@/permission'

function render(props: any) {
  const app = createApp(App)
  const { container } = props
  const mountPoint = container ? container.querySelector('#app') : document.getElementById('app')
  usePlugins(app)
  app.use(store).use(router).mount(mountPoint)
}

renderWithQiankun({
  mount(props) {
    console.log('Vu3eMicroApp mount')
    render(props)
  },
  bootstrap() {
    console.log('Vu3eMicroApp bootstrap')
  },
  unmount(props: any) {
    console.log('Vu3eMicroApp unmount')
  },
  update(props: any) {
    console.log('Vu3eMicroApp update')
  }
})

// eslint-disable-next-line no-underscore-dangle
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
