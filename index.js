/* eslint-disable no-undef */
const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function getRepositoryName() {
  let myOutput = '';
  let myError = '';

  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
    },
    stderr: (data) => {
      myError += data.toString();
    },
  };

  await exec.exec('git config --get remote.origin.url', [], options);

  const repository = myOutput.match('(?:git@|https://)github.com[:/](.*).git');

  return repository[2];
}

try {
  let name = '';

  getRepositoryName().then((repName) => {
    const withOwner = core.getInput('with-owner');
    const [owner, repo] = repName.split('/');

    switch (withOwner) {
      case 'false':
        name = repo;
        break;
      default:
        name = `${owner}/${repo}`;
        break;
    }

    let casedName = '';
    const stringCase = core.getInput('string-case');

    switch (stringCase) {
      case 'lowercase':
        casedName = name.toLowerCase();
        break;
      case 'uppercase':
        casedName = name.toUpperCase();
        break;
      default:
        casedName = name;
        break;
    }

    core.setOutput('repository-name', casedName);
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
