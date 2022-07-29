const core = require("@actions/core");
const exec = require("@actions/exec");

function getRepositoryName() {
  let myOutput = "";
  let myError = "";

  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
    },
    stderr: (data) => {
      myError += data.toString();
    },
  };

  await exec.exec(
    "git config --get remote.origin.url | sed -e 's/^git@.*:([[:graph:]]*).git/\1/'",
    [],
    options
  );

  return myOutput;
}

try {
  let name = "";

  const repName = getRepositoryName()
  const withOwner = core.getInput("with-owner");

  switch (withOwner) {
    case "false":
      name = repName.split("/").reverse()[0];
      break;
    case "true":
      name = repName;
      break;
    default:
      name = repName;
      break;
  }

  let casedName = ''
  const stringCase = core.getInput("string-case");

  switch (stringCase) {
    case "lowercase":
      casedName = name.toLowerCase();
      break;
    case "uppercase":
      casedName = name.toUpperCase();
      break;
    default:
      casedName = name;
      break;
  }

  core.setOutput("repository-name", casedName);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}


