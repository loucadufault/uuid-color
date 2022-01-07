# uuid-color

## Table of contents

### Interfaces

- [Options](interfaces/Options.md)

### Functions

- [colorFromUuid](modules.md#colorfromuuid)

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
| `options` | [`Options`](interfaces/Options.md) | An optional object to configure the color generation, and attach callbacks that directly receive the generated color code or components in various formats |

#### Returns

`string`

The generated color as a CSS <color> notation string

#### Defined in

[index.ts:64](https://github.com/loucadufault/uuid-color/blob/4088c61/src/index.ts#L64)
ring

#### Defined in

[index.ts:64](https://github.com/loucadufault/uuid-color/blob/4088c61/src/index.ts#L64)
