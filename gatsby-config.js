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
    plugins: [
        // Material UI
        'gatsby-plugin-top-layout',
        {
            resolve: 'gatsby-plugin-material-ui',
        },
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
        // Sitemap generation
        'gatsby-plugin-sitemap',
        // Caching site locally
        'gatsby-plugin-offline',
    ],
};
