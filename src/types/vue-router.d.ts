declare module 'vue-router' {
  interface RouteMeta {
    /** 是否隐藏标题栏 */
    hideNav?: boolean
    /** page title */
    title?: string
    /** i18n key */
    i18n?: string
    /** keepalive */
    keepAlive?: boolean
  }
}
export {}
