// File: populate_roster.js
// Description: Build member content from ./roster.xlsx

// Project imports
const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');

// Constants
const ROSTER_FILE_PATH = 'scripts/populate_roster/roster.xlsx';
const CURRENT_SEASON = '2019/20';

// Useful function for creating path-friendly strings
const pathify = (string) =>
    string
        .replace(/\s+/g, '-')
        .replace(/\//g, '-')
        .replace(/\./g, '-')
        .replace(/’/g, '')
        .replace(/’/g, '')
        .toLowerCase();

// Useful function for creating folders when necessary
function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

// Open workbook
const workbook = new Excel.Workbook();
workbook.xlsx.readFile(ROSTER_FILE_PATH)
  .then(function() {
      // Select first worksheet
      const worksheet = workbook.getWorksheet(1);

      // Iterate over rows
      worksheet.eachRow(function(row, rowNumber) {
          // Row 1 is just a header, so skip
          if (rowNumber < 2) {
              return;
          }

          // For some reason we see a 0 index column. Let's remove it
          const values = row.values.slice(1);

          // Values is structured as  [section, name, class, year joined]
          const [section, name, gradYear, memberSince] = values;

          // Form suffixed member name
          let suffixedName;
          let processedGradYear;
          if (typeof(gradYear) === 'number') {
              suffixedName = `${name} ’${gradYear.toString().slice(-2)}`;
              processedGradYear = JSON.stringify(gradYear);
          } else if (typeof(gradYear) === 'string') {
              suffixedName = `${name} ${gradYear}`;
              processedGradYear = gradYear;
          } else {
              suffixedName = name;
              processedGradYear = '';
          }

         // Build string to populate file contents
         const fileContents =
`---
# Full Name
fullName: "${name}"
# Suffixed Name
suffixedName: "${suffixedName}"
# Section
section: "${section}"
# Graduation Year (or name suffix)
gradYear: "${processedGradYear}"
# Year Joined
memberSince: "${memberSince}"
# Active Seasons
seasons: ["${CURRENT_SEASON}"]
# Is active member?
active: "true"
---

`;

          // Write data to file
         const targetFolder = `src/content/Members/${pathify(section)}`;
         const targetFile = `${targetFolder}/${pathify(suffixedName)}.md`;
         mkDirByPathSync(targetFolder);
         fs.writeFile(targetFile, fileContents, (err) => {
          if (err) {
              throw err;
          }

          // Success!
          console.log('Wrote file for ' + suffixedName);
        });
      });
  });
