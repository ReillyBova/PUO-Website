const plugins = require('./gatsby-plugins.js');

module.exports = {
    siteMetadata: {
        currentSeason: 2020, // Current season (as published on website)
        title: 'The Princeton University Orchestra',
        siteUrl: 'https://orchestra.princeton.edu',
        description:
            'Founded in 1896, the Princeton University Orchestra is a highly-acclaimed, internationally-touring symphony comprised of over 100 Princeton students.',
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
        socialMedia: {
            facebook: 'PUOrchestra',
            youtube: 'PrincetonUniversityOrchestra',
            instagram: 'princetonuorch',
            twitter: 'PUMusicDept',
            // TODO: Add spotify
        },
        relatedLinks: {
            department: 'music.princeton.edu',
            university: 'princeton.edu',
        },
        navigation: [
            { page: 'Concerts' },
            { page: 'Members' },
            {
                page: 'About',
                type: 'OnePageOnly',
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
                type: 'OnePageOnly',
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
    plugins: plugins,
};
