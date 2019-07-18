const fs = require(`fs`);

exports.onPostBuild = () => {
  const swDest = `public/sw.js`;
  const swUpdate = fs.readFileSync(`${__dirname}/sw-update.js`, `utf8`);
  fs.appendFileSync(swDest, `\n` + swUpdate);
};
