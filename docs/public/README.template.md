A lightweight package to generate unique and uniformly sampled colors from UUIDs.

Since the color space is only 255^3 whereas the uuid space is much larger, it is impossible to create a complete bijection, and collisions in the generated color space are more likely to happen.

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