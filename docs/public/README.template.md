A lightweight package to generate unique and uniformly sampled colors from UUIDs.

The RGB color space is represented and spanned by hexadecimal numbers in the 0x000000 to 0xffffff range. We can use a simple modulo hash function (`% (0xffffff + 0x000001)` i.e. `% 0x100000`) to return numbers in that range from the decimal representation of the UUID (a base 10 39-digit integer). We then extract the red, green, and blue components from the resulting hash (which represents a specific color in hexadecimal notation) using bit masks.

Since the color space is only 255^3 whereas the UUID space is much larger (5.3 x 10^36 possible UUIDs), it is impossible to create a complete bijection, and collisions in the generated color space are more likely to happen.

# Installation:

```sh
npm i uuid-colors
```

# Usage

```js
import { v4 as uuidv4 } from "uuid";
import { colorFromUuid } from "uuid-color";

const myUuid = uuidv4();

// returns a hex color code as a string "#rrggbb"
const hexColor = colorFromUuid(myUuid);
```

{{/docs/build/README.md}}