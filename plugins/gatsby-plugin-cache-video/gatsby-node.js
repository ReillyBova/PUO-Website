const fs = require(`fs`);

exports.onPostBuild = () => {
  const swDest = `public/sw.js`;
  const swVideo = fs.readFileSync(`${__dirname}/sw-video.js`, `utf8`);
  fs.appendFileSync(swDest, `\n` + swVideo);
};
