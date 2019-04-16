const pkg = require('./package')

module.exports = {
    mode: 'spa',

    /*
  ** Headers of the page
  */
    head: {
        title: 'Producer Chat – Connect, Give Feedback, Stay Accountable',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            },
            {
                name: 'og:image',
                content: 'https://www.producer.chat/pc-thumb-500.jpg'
            },
            {
                name: 'twitter:image',
                content: 'https://www.producer.chat/pc-thumb-500.jpg'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500,700'
            }
        ]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: ['~/assets/style/app.styl'],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '@/plugins/auth',
        '@/plugins/vuetify',
        '@/plugins/vue-notifications'
    ],
    /*
  ** Nuxt.js modules
  */
    modules: [
        ['@nuxtjs/google-analytics', { id: 'UA-126773503-1' }],
        '@nuxtjs/axios'
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                })
            }
        }
    }
}
