A lightweight package to deterministically generate unique and uniformly sampled colors from UUIDs.

### How it works

The RGB color space is represented by hexadecimal numbers in the 0x000000 to 0xffffff range. We use a simple modulo hash function (`% (0xffffff + 0x000001)` i.e. `% 0x100000`) to produce numbers in that range from the decimal representation of the UUID (a base 10 39-digit integer). We then extract the red, green, and blue components from the resulting hash (which represents a specific color in hexadecimal notation) using bit masks.

### Limitations

Since the color space is only 256^3 whereas the UUID space is much larger ([approximtely 5.3 x 10^36 possible UUIDs](https://www.uuidtools.com/what-is-uuid#overview)), it is impossible to create a complete bijection between the spaces, and so collisions in the generated color space can occur. This package does however guarantee that the color space is maximally utilized, assuming a uniform distribution of the input UUIDs within the UUID space.

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

[Live demo](https://codesandbox.io/s/uuid-color-usage-o0e4o)

{{/docs/dist/README.md}}