// Preprocess concert info into managable object
export const preprocessConcerts = (concerts, posterData) => (
    concerts.map(({ name, childMarkdownRemark }) => ({
        fileName: name,
        fluidPoster: (childMarkdownRemark.frontmatter.poster)?
            posterData[childMarkdownRemark.frontmatter.poster]
            : posterData[name],
        rawHTML: childMarkdownRemark.html,
        ...childMarkdownRemark.frontmatter,
    }))
);

// Preprocess posters in object organized by fileName
export const preprocessPosters = (posters) => (
    posters.reduce((posterData, {name, childImageSharp}) => {
        posterData[name] = childImageSharp.fluid;
        return posterData;
    }, {})
);

// Seperate concerts by seasons
export const groupConcertsBySeason = (concertData) => (
    concertData.reduce((dataBySeason, concert) => {
        const season = concert.season;
        dataBySeason[season] = [concert, ...(dataBySeason[season] || [])];
        return dataBySeason;
    }, {})
);
