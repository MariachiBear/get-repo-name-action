# Get Repository Name

This action gets the repository name and returns it as an output

## Inputs

### `with-owner`

**Not Required** | Defines if the owner name should be added in the name. | Default `"false"`

## Outputs

### `name`

The name of the repository.

## Example usage

```yml
uses: MariachiBear/hello-world-javascript-action@v1.1
with:
  with-owner: 'true'
```
