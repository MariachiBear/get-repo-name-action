/* eslint-disable no-undef */
import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import repoName from 'git-repo-name';
import userName from 'git-username';

try {
  let originalRepositoryName = '';

  const repositoryName = await repoName();
  const repositoryOwner = await userName();

  const withOwner = getInput('with-owner');

  switch (withOwner) {
    case 'false':
      originalRepositoryName = repositoryName;
      break;
    default:
      originalRepositoryName = `${repositoryOwner}/${repositoryName}`;
      break;
  }

  let finalRepositoryName = '';

  const stringCase = getInput('string-case');

  switch (stringCase) {
    case 'lowercase':
      finalRepositoryName = originalRepositoryName.toLowerCase();
      break;
    case 'uppercase':
      finalRepositoryName = originalRepositoryName.toUpperCase();
      break;
    default:
      finalRepositoryName = originalRepositoryName;
      break;
  }

  setOutput('repository-name', finalRepositoryName);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}
