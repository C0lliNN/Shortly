/* eslint-disable @typescript-eslint/no-var-requires */
const { publish } = require('gh-pages');

publish('dist', function (err) {
  if (err) {
    console.error('Error in Deployment');
    console.dir(err);
  }
});
