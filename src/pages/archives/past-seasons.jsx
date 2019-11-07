// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// Project imports
import {
    ConcertSeasons,
    PageLayout,
    Parallax,
    Sheet,
    ImageBanner,
} from 'components';

function PastSeasons({ data }) {
    // Render
    return (
        <PageLayout title="Past Seasons">
            <Parallax>
                <ImageBanner fluid={data.test.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting={"visible"}>
                <ConcertSeasons concerts={data.concerts.nodes} posters={data.posters.nodes} />
            </Sheet>
        </PageLayout>
    );
}

export const fluidImage = graphql`
    fragment fluidImage on File {
        name
        childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
            }
        }
    }
`;

export const fluidImage2 = graphql`
    fragment fluidImage2 on File {
        name
        childImageSharp {
            fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
            }
        }
    }
`;

export const pageQuery = graphql`
    query {
        posters: allFile(
            filter: {
                sourceInstanceName: { eq: "images" }
                relativeDirectory: { eq: "posters" }
                ext: { eq: ".jpg" }
            }
        ) {
            nodes {
                ...fluidImage
            }
        }
        test: file(relativePath: { eq: "poster.jpg" }) {
            ...fluidImage2
        }

        concerts: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Concerts\\/.*\\.md$/"},
                frontmatter: {current: {eq: "false"}}
            },
            sort: {fields: frontmatter___date}
        ) {
            nodes {
                html
                frontmatter {
                    concertName
                    colorTheme
                    date
                    season
                    poster
                    calendar
                    tickets
                    stream
                    youtube
                    spotify
                }
                parent {
                    ... on File {
                      name
                    }
                }
            }
        }
    }
`;

export default PastSeasons;
