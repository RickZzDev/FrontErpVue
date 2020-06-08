import axios from 'axios'

export default {


  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  env:{
    apiURL:process.env.apiUrl,
    api:axios.create({
      baseURL:process.env.apiURL
    })
  },

  axios:{
    baseURL: process.env.apiUrl
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vuelidate.js",
    "~/plugins/anime.js",
    "~/plugins/v-mask.js"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // ['nuxt-recaptcha', { key: '6LegeM0UAAAAAKPM_I7PetlzjCHlxLLEjGgE_icH', hideBadge: true, version:3 }],
    '@nuxtjs/recaptcha',
   
  ],
  recaptcha:{
      hideBadge: true,
      siteKey: '6LegeM0UAAAAAKPM_I7PetlzjCHlxLLEjGgE_icH',
      version: 3
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
