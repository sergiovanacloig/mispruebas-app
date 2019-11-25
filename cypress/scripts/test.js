const path = require('path');
const cypress = require('cypress');
const uuidv1 = require('uuid/v1');
const rimraf = require('rimraf');
const shell = require('shelljs');
const combine = require('./combine.js');

cypress.run({
    spec: [
        './cypress/integration/**/*'
    ]
})
.then(() => {
    const data = combine.combineMochaAwesomeReports();
    const uuid = uuidv1();
    combine.writeReport(data, uuid);
    rimraf(path.join(__dirname, '..', '../cypress/mochawesome-report.html'), () => {});
    rimraf(path.join(__dirname, '..', '../reports'), () => {});
    shell.exec(`"node_modules/.bin/marge" ./tests-combined.json  --inline`, (code, stdout, stderr) => {
        if (stderr) throw stderr;
        // cleanup
        shell.exec('mv ./mochawesome-report.html ./cypress/mochawesome-report.html');
        rimraf(path.join(__dirname, '..', '../tests-combined.json'), () => {});
    });
}).catch((err) => {
    /* eslint-disable no-console */
    console.error(err);
    /* eslint-enable no-console */
});