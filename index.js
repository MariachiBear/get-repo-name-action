const core = require("@actions/core");
const exec = require("@actions/exec");

try {
  // `who-to-greet` input defined in action metadata file
  const withOwner = getInput("with-owner");
  let name = "";
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

  switch (withOwner) {
    case "false":
      name = myOutput.split("/").reverse()[0];
      break;
    case "true":
      name = myOutput;
      break;
    default:
      name = myOutput;
      break;
  }

  setOutput("repository-name", name);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}
