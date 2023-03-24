/* eslint-disable no-undef */
import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import repoName from 'git-repo-name';
import userName from 'git-username';

try {
  let originalRepositoryName = '';

  const repositoryName = await repoName();
  const repositoryOwner = userName();

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
    case 'camelCase':
      finalRepositoryName = camelCase(originalRepositoryName);
      break;
    case 'capitalCase':
      finalRepositoryName = capitalCase(originalRepositoryName);
      break;
    case 'constantCase':
      finalRepositoryName = constantCase(originalRepositoryName);
      break;
    case 'dotCase':
      finalRepositoryName = dotCase(originalRepositoryName);
      break;
    case 'headerCase':
      finalRepositoryName = headerCase(originalRepositoryName);
      break;
    case 'noCase':
      finalRepositoryName = noCase(originalRepositoryName);
      break;
    case 'paramCase':
      finalRepositoryName = paramCase(originalRepositoryName);
      break;
    case 'pascalCase':
      finalRepositoryName = pascalCase(originalRepositoryName);
      break;
    case 'pathCase':
      finalRepositoryName = pathCase(originalRepositoryName);
      break;
    case 'sentenceCase':
      finalRepositoryName = sentenceCase(originalRepositoryName);
      break;
    case 'snakeCase':
      finalRepositoryName = snakeCase(originalRepositoryName);
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
