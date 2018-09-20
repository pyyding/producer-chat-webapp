
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Producer Chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'where music comes together' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico#2' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/auth.js'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true
  }
}
