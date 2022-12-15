<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <el-button @click="getInputValue">获取值</el-button>
    <TinymceEditor :id="id" v-model="tinymceContent" :init="initOptions" />
    <div class="editor-custom-btn-container">
      <!-- <EditorImageUpload
        :color="uploadButtonColor"
        class="editor-upload-btn"
        @success-callback="imageSuccessCBK"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
  // Docs: https://www.tiny.cloud/docs/advanced/usage-with-module-loaders/
  // Import TinyMCE
  import 'tinymce'
  // Default icons are required for TinyMCE 5.3 or above
  import 'tinymce/icons/default'
  // Import themes
  import 'tinymce/themes/silver'
  import 'tinymce/themes/mobile'
  // Any plugins you want to use has to be imported
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/autoresize'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/autosave'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/fullpage'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/imagetools'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/noneditable'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/print'
  import 'tinymce/plugins/save'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/spellchecker'
  import 'tinymce/plugins/tabfocus'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/template'
  import 'tinymce/plugins/textpattern'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/wordcount'
  // import 'tinymce/skins/content/default/content.css'
  import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
  import {
    defineComponent,
    reactive,
    toRefs,
    watch,
    nextTick,
    ref,
    computed,
    watchEffect
  } from 'vue'

  export const plugins = [
    'advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullpage fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars'
  ]

  export const toolbar = [
    'bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript hr  numlist image preview anchor pagebreak insertdatetime table emoticons  forecolor backcolor  fullscreen'
  ]

  const defaultId = () => `vue-tinymce-${+new Date()}${(Math.random() * 1000).toFixed(0)}`
  export default defineComponent({
    components: {
      TinymceEditor
      // EditorImageUpload
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: defaultId
      },
      toolbar: {
        type: Array,
        default: () => {
          return []
        }
      },
      menubar: {
        type: String,
        default: 'file edit insert view format table'
      },
      height: {
        type: String || Number,
        default: '360px'
      },
      width: {
        type: String || Number,
        default: 'auto'
      }
    },
    emits: ['input'],
    setup(props, ctx) {
      // const store = useStore()
      const dataMap = reactive({
        hasChange: false,
        hasInit: false,
        fullscreen: true,
        getlanguage: () => {
          return 'zh-cn'
        },
        uploadButtonColor: () => {
          return 'green'
          // return store.state.settings.theme
        },
        tinymceContent: props.value,
        containerWidth: () => {
          const { width } = props
          // Test matches `100`, `'100'`
          if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
            return `${width}px`
          }
          return width
        }
      })

      watchEffect(() => {
        dataMap.tinymceContent = props.value
      })

      const initOptions = ref({
        selector: `#${props.id}`,
        body_class: 'panel-body',
        object_resizing: false,
        toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
        menubar: false,
        plugins,
        language_url: `/tinymce/langs/zh-cn.js`,
        language: 'zh_CN',
        skin: 'oxide-dark',
        skin_url: `./tinymce/skins/`,
        emoticons_database_url: `./tinymce/emojis.min.js`,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        convert_urls: false,
        // inline: true,
        branding: false,
        height: 500,
        content_style: 'html {background: #242b3d; color: #ddd;}',
        images_upload_handler: (blobInfo, succFun, failFun) => {},

        init_instance_callback: (editor: any) => {
          console.log('test')
          if (props.value) {
            editor.setContent(props.value)
          }
          dataMap.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            dataMap.hasChange = true
            // console.log('emit', editor.getContent())
            ctx.emit('input', editor.getContent())
          })
        },
        setup: (editor: any) => {
          editor.on('FullscreenStateChanged', (e: any) => {
            dataMap.fullscreen = e.state
          })
        }
      })

      // watch(
      //   () => store.state.app.language,
      //   () => {
      //     const tinymceManager = (window as any).tinymce
      //     const tinymceInstance = tinymceManager.get(props.id)
      //     if (dataMap.fullscreen) {
      //       tinymceInstance.execCommand('mceFullScreen')
      //     }
      //     if (tinymceInstance) {
      //       tinymceInstance.destroy()
      //     }
      //     nextTick(() => {
      //       tinymceManager.init(initOptions)
      //     })
      //   }
      // )

      watch(
        () => dataMap.tinymceContent,
        (value) => {
          // emit('input')
        }
      )
      const getInputValue = () => {
        console.log(dataMap)
        console.log(dataMap.tinymceContent, 'dataMap')
      }
      const imageSuccessCBK = (arr: []) => {
        const tinymce = (window as any).tinymce.get(props.id)
        arr.forEach((v) => {
          tinymce.insertContent(`<img class="wscnph" src="${v.url}" >`)
        })
      }
      return { ...toRefs(dataMap), imageSuccessCBK, initOptions, getInputValue }
    }
  })
</script>

<style lang="scss" scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
    .mce-fullscreen {
      z-index: 10000;
    }
  }
  .editor-custom-btn-container {
    position: absolute !important;
    right: 6px;
    top: 6px;
    z-index: 1002;
  }
  .editor-upload-btn {
    display: inline-block;
  }
  textarea {
    visibility: hidden;
    z-index: -1;
  }
</style>

<style lang="scss">
  .tox-tinymce {
    height: 400px !important;
    border: 1px solid var(--el-border-color-base) !important;
    border-radius: 3px !important;
  }

  .tox-tbtn {
    /* background: #333 !important; */
  }
  .tox .tox-tbtn svg {
    display: block;
    fill: #000 !important;
  }
  .tox .tox-tbtn--enabled,
  .tox .tox-tbtn--enabled:hover {
    background: #ddd !important;
    border: 0;
    box-shadow: none;
    color: #fff !important;
  }
  .tox .tox-tbtn--disabled svg {
    fill: #555 !important;
  }
  .tox .tox-toolbar-overlord {
    background-color: var(--el-border-color-base) !important;
    border: none !important;
  }
  .tox-editor-header {
    border-bottom: none !important;
  }
  .tox-toolbar {
    border: none !important;
  }

  .tox .tox-toolbar,
  .tox .tox-toolbar__primary,
  .tox .tox-toolbar__overflow {
    background: url("data:image/svg+xml;charset=utf8,%3Csvg height='39px' viewBox='0 0 40 39px' width='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='38px' width='100' height='1' fill='%23404656'/%3E%3C/svg%3E")
      left 0 top 0 #242b3d !important;
  }
  .tox-toolbar {
    /* background-color: var(--el-color-black) !important; */
  }
</style>
