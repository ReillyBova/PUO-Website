module.exports = {
    siteMetadata: {
        title: 'The Princeton University Orchestra',
        siteUrl: 'https://orchestra.princeton.edu',
        description:
            'Founded in 1896, the Princeton University Orchestra is a highly-acclaimed, internationally-touring symphony comprised of over 100 Princeton students.',
        twitter: '@PrincetonUOrch',
        author: 'ReillyBova',
        card: {
            image: 'https://orchestra.princeton.edu/card.jpg',
            width: '1365',
            height: '1365',
        },
        keywords: [
            'PUO',
            'Princeton',
            'Orchestra',
            'Symphony',
            'University',
            'Classical Music',
        ],
        navigation: [
            { page: 'Concerts' },
            { page: 'Members' },
            {
                page: 'About',
                sections: [
                    'The Orchestra',
                    'Our Conductor',
                    'Our Officers',
                    'Contact Us',
                ],
            },
            {
                page: 'Media',
                sections: ['Video', 'Audio', 'Photo Gallery'],
            },
            {
                page: 'News',
                sections: ['Announcements', 'In the Press', 'Conductor’s Blog'],
            },
            {
                page: 'FAQ',
                sections: [
                    'For Our Audience',
                    'For Princeton Students',
                    'For Prospective High School Students',
                ],
            },
            {
                page: 'Archives',
                sections: ['Past Seasons', 'Past Tours', 'Past Orchestras'],
            },
            { page: 'Donate' },
        ],
    },
    pathPrefix: '/PUO-Website', // Remove for production build
    plugins: [
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
                    videos: './assets/videos', // <- will become ./src/assets/branding
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
                    `./src/components/Navbar/Navbar.jsx`
                ),
            },
        },
        // Markdown support
        'gatsby-transformer-remark',
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
        // Caching site locally
        {
            resolve: 'gatsby-plugin-offline',
            options: {
                runtimeCaching: [
                    {
                        // Default: Use cacheFirst since these don't need to be
                        // revalidated
                        // CHANGED: exclude static.*.mp4 files because they follow a different rule
                        urlPattern: /(\.js$|\.css$|static\/^[^.]+$|\.(?!(mp4)$)([^.]+$))/,
                        handler: `cacheFirst`,
                    },
                    {
                        // Default: Add runtime caching of various other page resources
                        urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
                        handler: `staleWhileRevalidate`,
                    },
                    {
                        // Default: Google Fonts CSS (doesn't end in .css so we need to specify it)
                        urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                        handler: `staleWhileRevalidate`,
                    },
                ],
            },
        },
        // Custom workbox caching for videos to work with Safari
        'gatsby-plugin-cache-video',
        // Sitemap generation
        'gatsby-plugin-sitemap',
        // Force service worker updates when any changes are detected
        'gatsby-plugin-update-sw',
    ],
};
