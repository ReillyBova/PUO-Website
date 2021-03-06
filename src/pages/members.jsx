// Library imports
import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
// Project imports
import {
    PageLayout,
    Parallax,
    Sheet,
    Subheader,
    ImageBanner,
} from 'components';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Preset section order for display
const SECTION_ORDER = [
    'Artistic Leadership',
    'Violin',
    'Viola',
    'Cello',
    'Double Bass',
    'Flute',
    'Oboe',
    'Clarinet',
    'Bassoon',
    'Horn',
    'Trumpet',
    'Trombone',
    'Tuba',
    'Timpani/Percussion',
    'Harp',
    'Keyboard',
    'Library',
    'Personnel',
    'Production',
];

// Styling for page elements
const memberPageStyles = makeStyles((theme) => ({
    membersWrapper: {
        marginRight: 'auto',
        marginLeft: 'auto',
        columnGap: 'theme.spacing(1)',
        columnCount: 4,
        [theme.breakpoints.down('md')]: {
            columnCount: 3,
            [theme.breakpoints.down('sm')]: {
                columnCount: 2,
                maxWidth: 'fit-content',
                '@media screen and (max-width: 480px)': {
                    columnCount: 1,
                    maxWidth: 250,
                },
            },
        },
    },
    sectionWrapper: {
        display: 'inline-block',
        paddingBottom: theme.spacing(2),
    },
}));

function Members({ data }) {
    // Group members by section
    const membersBySection = {};
    data.members.nodes.forEach((member) => {
        // Extract member info from frontmatter heading
        const { fullName, suffixedName, section, title, orderOverride } = member.frontmatter;

        // Create section if it doesn't exist
        if (!membersBySection[section]) {
            membersBySection[section] = [];
        }

        // Computer member last name and add member to section
        const lastName = fullName.split(' ').splice(-1)[0];
        membersBySection[section].push({ lastName, suffixedName, title, orderOverride });
    });

    // Sort sections by members' order overrides, then by members' last names
    const compareMembers = (a, b) => {
        const aOrderOverride = Number.parseInt(a.orderOverride);
        const bOrderOverride = Number.parseInt(b.orderOverride);

        if (aOrderOverride === bOrderOverride) {
            return a.lastName.localeCompare(b.lastName);
        } else if (aOrderOverride < 0) {
            return 1;
        } else if (bOrderOverride < 0) {
            return 1;
        } else {
            return aOrderOverride - bOrderOverride;
        }
    };
    Object.keys(membersBySection).forEach((section) =>
        membersBySection[section].sort(compareMembers)
    );

    // CSS classes for styling
    const { membersWrapper, sectionWrapper } = memberPageStyles();

    // Render
    return (
        <PageLayout title='Members'>
            <Parallax>
                <ImageBanner fluid={data.banner.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting='visible'>
                <Subheader>{'Members'}</Subheader>
                <div className={membersWrapper}>
                    {SECTION_ORDER.map((section) => (
                        <div key={section}>
                            <div className={sectionWrapper}>
                                <Typography variant='h6'>{section}</Typography>
                                {membersBySection[section].map(
                                    ({ suffixedName, title }) => (
                                        <Fragment key={suffixedName}>
                                            <Typography
                                                variant='body1'
                                            >
                                                {suffixedName}
                                            </Typography>
                                            {title &&
                                                <Typography
                                                    variant='body2'
                                                    color='textSecondary'
                                                    gutterBottom
                                                >
                                                    {title}
                                                </Typography>
                                            }
                                        </Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Sheet>
        </PageLayout>
    );
}

// Query fragment for members data
export const memberDataFragment = graphql`
    fragment MemberDataFragment on MarkdownRemark {
        html
        frontmatter {
            fullName
            suffixedName
            section
            title
            orderOverride
        }
    }
`;

// Fetch data for page
export const pageQuery = graphql`
    query {
        banner: file(
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "banners" }
            name: { eq: "members" }
        ) {
            ...ImageBannerFragment
        }

        members: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Members\\/.*\\.md$/"},
                frontmatter: {active: {eq: "true"}}
            },
        ) {
            nodes {
                ...MemberDataFragment
            }
        }
    }
`;

export default Members;
