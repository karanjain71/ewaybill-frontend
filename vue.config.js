module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // https://cli.vuejs.org/config/#productionsourcemap
  productionSourceMap: false,
  css:{
      extract: { ignoreOrder: true },
      loaderOptions: {
          sass: {
            additionalData: "@import '~@/assets/scss/vuetify/variables'"
          },
          scss: {
            additionalData: "@import '~@/assets/scss/vuetify/variables';"
          }
      }
  },

  configureWebpack: {
      resolve: {
          alias: {
              vue$: 'vue/dist/vue.runtime.min.js' // use the full build
          }
      }
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: ['resize-detector', 'vuetify']
};
