module.exports = [
    // Material UI
    'gatsby-plugin-top-layout',
    'gatsby-plugin-material-ui',
    // Search Engine Optimization (SEO)
    'gatsby-plugin-react-helmet',
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
            name: 'The Princeton University Orchestra',
            short_name: 'PUO',
            start_url: '/',
            background_color: '#221e20',
            theme_color: '#f58025',
            display: 'minimal-ui',
            icon: 'static/favicon.svg',
        },
    },
    // Path shortcuts when importing
    {
        resolve: 'gatsby-plugin-module-resolver',
        options: {
            root: './src', // <- will be used as a root dir
            aliases: {
                branding: './assets/branding', // <- will become ./src/assets/branding
                icons: './assets/icons', // <- will become ./src/assets/icons
                videos: './assets/videos', // <- will become ./src/assets/videos
                components: './components', // <- will become ./src/components
                content: './content', // <- will become ./src/content
                utils: './utils', // <- will become ./src/utils
            },
        },
    },
    // Global navbar sits above pages
    {
        resolve: `gatsby-plugin-layout`,
        options: {
            component: require.resolve(
                `./src/components/SiteLayout/SiteLayout.jsx`
            ),
        },
    },
    // Markdown support
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                {
                    resolve: 'gatsby-remark-smartypants',
                    options: {
                        dashes: 'oldschool',
                    },
                },
            ],
        },
    },
    // Written (markdown) content filesystem for queries
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `content`,
            path: `${__dirname}/src/content`,
        },
    },
    // Image support
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/assets/images`,
        },
    },
    // Inline SVG support
    {
        resolve: 'gatsby-plugin-react-svg',
        options: {
            rule: {
                include: /icons/,
            },
        },
    },
    // Generate _headers file for Netlify
    'gatsby-plugin-netlify',
    // Caching site locally
    {
        resolve: 'gatsby-plugin-offline',
        options: {
            precachePages: [``, `/concerts`],
            workboxConfig: {
                runtimeCaching: [
                    {
                        // Default: Use cacheFirst since these don't need to be
                        // revalidated
                        // CHANGED: exclude static.*.mp4 files because they follow a different rule
                        urlPattern: /(\.js$|\.css$|static\/^[^.]+$|\.(?!(mp4)$)([^.]+$))/,
                        handler: `CacheFirst`,
                    },
                    {
                        // Default: page-data.json files are not content hashed
                        urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
                        handler: `NetworkFirst`,
                    },
                    {
                        // Default: Add runtime caching of various other page resources
                        urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
                        handler: `StaleWhileRevalidate`,
                    },
                    {
                        // Default: Google Fonts CSS (doesn't end in .css so we need to specify it)
                        urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                        handler: `StaleWhileRevalidate`,
                    },
                ],
            },
        },
    },
    // Custom workbox caching for videos to work with Safari
    'gatsby-plugin-cache-video',
    // Sitemap generation
    'gatsby-plugin-sitemap',
    // Force service worker updates when any changes are detected
    'gatsby-plugin-update-sw',
];
