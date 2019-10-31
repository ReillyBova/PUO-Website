// Preprocess concert info into managable object
export const preprocessConcerts = (concerts, posterData) =>
    concerts.map(({ html, frontmatter, parent }) => ({
        fileName: parent && parent.name,
        fluidPoster: frontmatter.poster
            ? posterData[frontmatter.poster]
            : posterData[parent && parent.name],
        rawHTML: html,
        ...frontmatter,
    }));

// Preprocess posters in object organized by fileName
export const preprocessPosters = (posters) =>
    posters.reduce((posterData, { name, childImageSharp }) => {
        posterData[name] = childImageSharp.fluid;
        return posterData;
    }, {});

// Seperate concerts by seasons
export const groupConcertsBySeason = (concertData) =>
    concertData.reduce((dataBySeason, concert) => {
        const season = concert.season;
        dataBySeason[season] = [concert, ...(dataBySeason[season] || [])];
        return dataBySeason;
    }, {});
