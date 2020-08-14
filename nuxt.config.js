export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  server: {
    port: 8000,
    host: '0.0.0.0',
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_656382_hx08jbpfs0v.css',
      },
    ],
  },
  /*
   ** Customize router highlight color
   */
  router: {
    middleware: ['changeSideStatus'],
    linkActiveClass: 'link-active',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#0088f5',
  },
  /*
   ** Global CSS
   */
  css: [
    'swiper/css/swiper.css',
    'highlight.js/scss/atom-one-dark.scss',
    '@/assets/scss/app.scss',
  ],
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/swiper-plugin', ssr: true },
    { src: '@/plugins/filters', ssr: true },
    { src: '@/plugins/marked' },
    { src: '@/plugins/highlight' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@/plugins/filters',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: 'http://49.233.165.116:3000',
      // target: 'http://127.0.0.1:3000', // 网站请求数据
      changeOrigin: true,
    },
    '/uploads': {
      target: 'http://www.zhangwurui.net', // 网站请求数据
      changeOrigin: true,
    },
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: process.argv.join('').includes('analyze'),
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue|scss)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
      }
    },
  },
}
