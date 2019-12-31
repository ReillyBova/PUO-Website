// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import {
    ConcertSeasons,
    PageLayout,
    Parallax,
    Sheet,
    ImageBanner,
    InternalButtonLink,
} from 'components';

// Styling for homepage elements
const concertPageStyles = makeStyles((theme) => ({
    buttonWrapper: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: -theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginTop: -theme.spacing(2),
        },
    },
}));

function Concerts({ data }) {
    // CSS classes
    const { buttonWrapper } = concertPageStyles();

    // Render
    return (
        <PageLayout title="Concerts">
            <Parallax>
                <ImageBanner fluid={data.banner.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting={'visible'}>
                <ConcertSeasons
                    concerts={data.concerts.nodes}
                    posters={data.posters.nodes}
                />
                <div className={buttonWrapper}>
                    <InternalButtonLink
                        color="primary"
                        variant="outlined"
                        to={`/archives/past-seasons`}
                    >
                        Explore Past Seasons
                    </InternalButtonLink>
                </div>
            </Sheet>
        </PageLayout>
    );
}

// Fetch data for page
export const pageQuery = graphql`
    query {
        banner: file(
            sourceInstanceName: {eq: "images"},
            relativeDirectory: {eq: "banners"},
            name: {eq: "concerts"}
        ) {
            ...ImageBannerFragment
        }

        posters: allFile(
            filter: {
                sourceInstanceName: { eq: "images" }
                relativeDirectory: { eq: "posters" }
                ext: { eq: ".jpg" }
            }
        ) {
            nodes {
                ...ConcertPosterFragment
            }
        }

        concerts: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Concerts\\/.*\\.md$/"},
                frontmatter: {current: {eq: "true"}}
            },
            sort: {fields: frontmatter___date}
        ) {
            nodes {
                ...ConcertDataFragment
            }
        }
    }
`;

export default Concerts;
