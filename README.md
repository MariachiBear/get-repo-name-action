# Get Repository Name

This action gets the repository name and returns it as an output

## Inputs

### `with-owner`

**Not Required** | Defines if the owner name should be added in the name. | Default `"false"`

### `string-case`

**Not Required** | Special case to transform the repository name. | Possible values : [`"lowercase"`, `"uppercase"`,`"camelCase"`,`"capitalCase"`,`"constantCase"`,`"dotCase"`,`"headerCase"`,`"noCase"`,`"paramCase"`,`"pascalCase"`,`"pathCase"`,`"sentenceCase"`,`"snakeCase"`]

<small>The case conversion is made with the [change-case]([https://](https://github.com/blakeembrey/change-case)) npm package.</small>

## Outputs

### `repository-name`

The name of the repository.

## Example usage

```yml
name: Action Example

on:
  push:

jobs:
  build_and_push:
    runs-on: ubuntu-latest

    steps:
      ...
      - name: Get repository name
        id: repo-name
        uses: MariachiBear/get-repo-name-action@v1.1.0
        with:
          with-owner: 'true'
          string-case: 'uppercase'

      - name: Build and Push
        uses: docker/build-push-action@v3
        env:
          REPO_NAME: ${{ steps.repo-name.outputs.repository-name }}
      ...

```
