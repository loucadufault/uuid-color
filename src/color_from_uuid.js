import { validate as isValidUuid } from "uuid";
import { UuidEncoder } from "uuid-encoder";
import convert from "color-convert";


const DEFAULT_COLOR_FORMAT = "hex";
const DEFAULT_IS_RAW = false;


const encoder = UuidEncoder("base10");


// type Options = {
//     raw?: boolean;
//     format?: "hex" | "rgb" | "hsl";
//     receivers?: {
//         hex?: (hexString: string) => any;
//         rgb?: (red: number, green: number, blue: number) => any;
//         hsl?: (hue: number, saturation: number, lightness: number) => any;
//     }
// }


export function colorFromUuid(uuid, options={}) {
    if (!isValidUuid(uuid)) {
        throw new Error("Given string is not a valid UUID.");
    }

    const encodedUuid = encoder.encode(uuid);

    const colorCode = encodedUuid % 0x1000000;
    const red = colorCode >> 16;
    const green = (colorCode >> 8) & 0xff;
    const blue = colorCode & 0xff;

    const receivers = {};
    if (options.hasOwnProperty("receivers")) {
        ["rgb", "hsl", "hex"].forEach(format => {
            if (options.receivers.hasOwnProperty(format)) {
                receivers.format = options.receivers.format; // link to callbacks
            }
        });
    }

    /*
     By default, return values are rounded. To get the unrounded (raw) results, use the raw: true option
    */
    const isRaw = DEFAULT_IS_RAW;
    if (options.hasOwnProperty("raw") && typeof(options.raw) === "boolean") {
        isRaw = options.raw; // with TS this should be forced to bool
    }

    if (!isRaw) {
        // TODO round RGB if needed
    }

    if ("rgb" in receivers) {
        receivers.rgb(red, green, blue);
    }
    if ("hsl" in receivers) {
        receivers.hsl(...convert.rgb.hsl(red, green, blue));
    }
    if ("hex" in receivers) {
        receivers.hex(convert.rgb.hex(red, green, blue).toLowerCase());
    }

    let format = DEFAULT_COLOR_FORMAT;
    if (options.hasOwnProperty("format")) {
        format = options.format;
    }

    switch (format) {
        case "rgb":
            return `rgb(${red}, ${green}, ${blue})`;
        case "hsl":
            return `hsl(${convert.rgb.hsl(red, green, blue).join(", ")})`;
        default: // don't error
        case "hex":
            return `#${convert.rgb.hex(red, green, blue).toLowerCase()}`;
    }
}