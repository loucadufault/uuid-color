# Reference - v0.1.0

## Table of contents

### Interfaces

- [Options](docs/dist/interfaces/Options.md)

### Functions

- [colorFromUuid](docs/dist/README.md#colorfromuuid)

## Functions

### colorFromUuid

▸ **colorFromUuid**(`uuid`, `options?`): `string`

Returns the generated color associated with the given uuid.

**`throws`** [Error](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/error)
This exception is thrown if the input uuid string is not a valid UUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | The uuid for which to generate a color |
| `options` | [`Options`](docs/dist/interfaces/Options.md) | An optional object to configure the color generation, and attach callbacks that directly receive the generated color code or components in various formats |

#### Returns

`string`

The generated color as a CSS `<color>` notation string

#### Defined in

[index.ts:81](https://github.com/loucadufault/uuid-color/blob/1d2a5c0/src/index.ts#L81)
