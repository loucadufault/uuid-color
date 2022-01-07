# Reference - v0.0.1

## Table of contents

### Interfaces

- [Options](docs/build/interfaces/Options.md)

### Functions

- [colorFromUuid](docs/build/README.md#colorfromuuid)

## Functions

### colorFromUuid

▸ **colorFromUuid**(`uuid`, `options?`): `string`

Returns the generated color associated with the given uuid.

**`throws`** {@link Error}
This exception is thrown if the input uuid string is not a valid UUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | The uuid for which to generate a color |
| `options` | [`Options`](docs/build/interfaces/Options.md) | An optional object to configure the color generation, and attach callbacks that directly receive the generated color code or components in various formats |

#### Returns

`string`

The generated color as a CSS `<color>` notation string

#### Defined in

[index.ts:64](https://github.com/loucadufault/uuid-color/blob/30a3faf/src/index.ts#L64)
