import { getInput, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const withOwner = getInput("with-owner");
  let name = "";

  switch (withOwner) {
    case "false":
      name = context.repo.repo.split("/")[0];
      break;
    case "true":
      name = context.repo.repo;
      break;
    default:
      name = context.repo.repo;
      break;
  }

  setOutput("repository-name", name);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}
