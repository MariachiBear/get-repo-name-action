const core = require("@actions/core");
const github = require("@actions/github");

try {
  const withOwner = core.getInput("with-owner");
  let name = "";

  switch (withOwner) {
    case "false":
      name = github.context.repo.repo.split("/")[0];
      break;
    case "true":
      name = github.context.repo.repo;
      break;
    default:
      name = github.context.repo.repo;
      break;
  }

  core.setOutput("repository-name", name);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
