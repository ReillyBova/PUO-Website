exports.onCreateWebpackConfig = ({ actions, stage }) => {
    // If production JavaScript and CSS build
    if (stage === 'build-javascript') {
        // Turn off source maps (good for debugging; bad for production)
        actions.setWebpackConfig({
            devtool: false,
        });
    }
};
