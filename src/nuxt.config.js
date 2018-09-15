module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Nuxtjs SSR Firebase Functions",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      { rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: "stylesheet",
        href: "https://cdn.muicss.com/mui-0.9.35/css/mui.min.css"
      }
    ]
  },

  // <script src="https://cdn.muicss.com/mui-0.9.35/js/mui.min.js"></script>
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"
  },
  css: [
    '@/assets/style/app.styl'
  ],
  plugins: [
    '@/plugins/vuetify.js',
    '@/plugins/auth.js'
  ],
  /*
   ** Build configuration
   */
  buildDir: "../prod/server/nuxt",
  build: {
    publicPath: "/assets/",
    extractCSS: true,
    vendor: [
      '~/plugins/vuetify.js'
    ]
  }
};
