// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Custom styles for component
const overlayStyles = makeStyles((theme) => ({
    '@keyframes orangeLine': {
        from: { width: 0 },
        to: { width: '50%' },
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginTop: -30,
    },
    overlayWrapper: {
        position: 'absolute',
        top: 0,
        marginTop: 128,
        width: '100%',
        height: 'calc(100vh - 198px)',
        display: 'flex',
        flexDirection: 'column',

        '@media screen and (max-width: 599px), screen and (max-height: 500px) and (min-width: 600px)': {
            marginTop: 80,
            height: 'calc(100vh - 150px)',
        },
    },
    quotesWrapper: {
        flex: 0,
        color: 'white',
        textShadow: '3px 3px 5px rgba(0,0,0,0.6)',
        userSelect: 'none',
        cursor: 'default',

        // Expanding orange line element
        '&:after': {
            content: "''",
            display: 'block',
            width: '50%',
            height: 4,
            margin: 'calc(75vh - 256px + 12px) auto 0 auto',
            background: theme.palette.primary.main,
            animation: '$orangeLine 1.2s',
            animationTimingFunction: 'ease',
            animationDelay: '1s',
            animationFillMode: 'both',
        },

        '@media screen and (max-height: 500px) and (min-width: 600px)': {
            '@media screen and (max-height: 485px)': {
                display: 'none',
            },
            '@media screen and (min-width: 1030px)': {
                display: 'none',
            },
        },
        '@media screen and (max-width: 599px) and (min-width: 420px) and (max-height: 460px)': {
            display: 'none',
        },
        '@media screen and (max-width: 420px) and (max-height: 450px)': {
            display: 'none',
        },
    },
    quoteAuthor: {
        fontSize: 40,
        fontFamily: 'Roboto, Open Sans, Roboto, Helvetica, Arial, sans-serif',
        textAlign: 'right',
        padding: '0 64px',
        fontWeight: 500,

        '@media screen and (max-height: 790px) and (min-width: 600px),\
            screen and (max-width: 1295px) and (min-width: 600px) and (max-height: 1100px),\
            screen and (max-width: 760px) and (min-width: 600px)': {
            '@media screen and (max-height: 715px), screen and (max-width: 1050px)': {
                fontSize: 22,
                '@media screen and (max-height: 630px) and (max-width: 1030px),\
                    screen and (max-width: 765px) and (max-height: 725px)': {
                    padding: '12px 32px',
                    fontSize: 14,
                    '@media screen and (max-height: 485px)': {
                        display: 'none',
                    },
                },
                '@media screen and (max-height: 585px) and (min-width: 1030px)': {
                    fontSize: 14,
                    '@media screen and (max-height: 500px)': {
                        display: 'none',
                    },
                },
            },
        },
        '@media screen and (max-width: 599px)': {
            padding: '12px 32px',
            fontSize: 25,
            '@media screen and (min-width: 420px) and (max-height: 845px)': {
                fontSize: 22,
                '@media screen and (max-height: 740px)': {
                    fontSize: 18,
                    '@media screen and (max-height: 620px)': {
                        fontSize: 14,
                        '@media screen and (max-height: 525px)': {
                            fontSize: 11,
                            '@media screen and (max-height: 460px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            '@media screen and (max-width: 420px)': {
                padding: '12px 16px',
                fontSize: 18,
                '@media screen and (max-height: 700px)': {
                    fontSize: 14,
                    '@media screen and (max-height: 570px)': {
                        fontSize: 11,
                        '@media screen and (max-height: 495px)': {
                            fontSize: 9,
                            '@media screen and (max-height: 450px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
        },
    },
    quoteBlock: {
        height: 'calc(75vh - 256px)',
        width: '100%',
        display: 'flex !important',
        alignItems: 'center',
        position: 'absolute',
    },
    quoteText: {
        fontSize: 64,
        lineHeight: '1.2',
        fontFamily: 'Lora, serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '32px 64px',
        transition: 'font-size, padding, 0.5s',

        '@media screen and (max-height: 790px) and (min-width: 600px),\
            screen and (max-width: 1295px) and (min-width: 600px) and (max-height: 1100px),\
            screen and (max-width: 760px) and (min-width: 600px)': {
            fontSize: 50,
            '@media screen and (max-height: 715px), screen and (max-width: 1050px)': {
                fontSize: 35,
                '@media screen and (max-height: 630px) and (max-width: 1030px),\
                    screen and (max-width: 765px) and (max-height: 725px)': {
                    padding: '0 32px',
                    fontSize: 22,
                    '@media screen and (max-height: 485px)': {
                        display: 'none',
                    },
                },
                '@media screen and (max-height: 585px) and (min-width: 1030px)': {
                    fontSize: 22,
                    '@media screen and (max-height: 500px)': {
                        display: 'none',
                    },
                },
            },
        },
        '@media screen and (max-width: 599px)': {
            padding: '0 32px',
            fontSize: 40,
            '@media screen and (min-width: 420px) and (max-height: 845px)': {
                fontSize: 35,
                '@media screen and (max-height: 740px)': {
                    fontSize: 28,
                    '@media screen and (max-height: 620px)': {
                        fontSize: 22,
                        '@media screen and (max-height: 525px)': {
                            fontSize: 18,
                            '@media screen and (max-height: 460px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            '@media screen and (max-width: 420px)': {
                padding: '0 16px',
                fontSize: 28,
                '@media screen and (max-height: 700px)': {
                    fontSize: 22,
                    '@media screen and (max-height: 570px)': {
                        fontSize: 18,
                        '@media screen and (max-height: 495px)': {
                            fontSize: 14,
                            '@media screen and (max-height: 450px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
        },
    },
    centerer: {
        width: '100%',
    },
}));

export default overlayStyles;
