A lightweight package to generate unique and uniformly sampled colors from UUIDs.

The RGB color space is represented and spanned by hexadecimal numbers in the 0x000000 to 0xffffff range. We can use a simple modulo hash function (`% (0xffffff + 0x000001)` i.e. `% 0x100000`) to return numbers in that range from the decimal representation of the UUID (a base 10 39-digit integer). We then extract the red, green, and blue components from the resulting hash (which represents a specific color in hexadecimal notation) using bit masks.

Since the color space is only 255^3 whereas the UUID space is much larger ([approximtely 5.3 x 10^36 possible UUIDs](https://www.uuidtools.com/what-is-uuid#overview)), it is impossible to create a complete bijection between the spaces, and so collisions in the generated color space are more likely to happen. This package does guarantee that the color space is maximally utilized, assuming a uniform distribution of the input UUIDs in the UUID space.

# Installation:

```sh
npm i uuid-color
```

# Usage

```js
import { v4 as uuidv4 } from "uuid";
import { colorFromUuid } from "uuid-color";

const myUuid = uuidv4();

// returns a hex color code as a string "#rrggbb"
const hexColor = colorFromUuid(myUuid);
```

# Reference - v0.0.5

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

[index.ts:64](https://github.com/loucadufault/uuid-color/blob/2177a9e/src/index.ts#L64)
