import { validate as isValidUuid } from "uuid";
import { UuidEncoder } from "uuid-encoder";
import convert from "color-convert";


const DEFAULT_COLOR_FORMAT = "hex";
const DEFAULT_IS_RAW = false;


const encoder = UuidEncoder("base10");


type SupportedColorNotations =  "hex" | "rgb" | "hsl";

type Receivers = {
    hex?: (hexString: string) => void;
    rgb?: (red: number, green: number, blue: number) => void;
    hsl?: (hue: number, saturation: number, lightness: number) => void;
}

export interface Options {
    /**
     * Determines whether the generated color components will be rounded.
     * 
     * @remarks
     * Only applies when the specified format is `"hsl"`, as this is the only output format that involves a lossy conversion (from RGB model components).
     * 
     * @defaultValue `false`
     */
    raw?: boolean;

    /**
     * Determines the output format of the generated color. 
     * 
     * @remarks
     * Colors are returned as strings in the CSS <color> data type hexadecimal or functional notation corresponding to the specified format.
     * 
     * @defaultValue `"hex"`
     */
    format?: SupportedColorNotations;

    /**
     * Attach callbacks to {@link SupportedColorNotations | supported color notations} as keys that will be called with the corresponding generated color components or code. Eliminates the need to parse the returned string if further manipulation is desired.
     * 
     * @remarks
     * Does not affect the return value of {@link colorFromUuid | the `colorFromUuid` function}.
     * See {@link Receivers | the Receivers type} for more details.
     */
    receivers?: Receivers;
}

/**
 * Returns the generated color associated with the given uuid.
 * 
 * @param uuid - The uuid for which to generate a color
 * @param options - An optional object to configure the color generation, and attach callbacks that directly receive the generated color code or components in various formats
 * @returns The generated color as a CSS <color> notation string
 * 
 * @throws {@link Error}
 * This exception is thrown if the input uuid string is not a valid UUID.
 * 
 * @public
 */
export function colorFromUuid(uuid: string, options: Options = {}): string {
    if (!isValidUuid(uuid)) {
        throw new Error("Given string is not a valid UUID.");
    }

    const encodedUuid = encoder.encode(uuid);

    const colorCode = encodedUuid % 0x1000000;
    const red = colorCode >> 16;
    const green = (colorCode >> 8) & 0xff;
    const blue = colorCode & 0xff;

    const receivers = {} as Receivers;
    if (options.hasOwnProperty("receivers")) {
        ["rgb", "hsl", "hex"].forEach(format => {
            if (options.receivers.hasOwnProperty(format)) {
                receivers[format] = options.receivers[format]; // link to callbacks
            }
        });
    }

    /*
     By default, return values are rounded. To get the unrounded (raw) results, use the raw: true option
    */
    let isRaw = DEFAULT_IS_RAW;
    if (options.hasOwnProperty("raw")) {
        isRaw = options.raw;
    }

    if (!isRaw) {
        // TODO round RGB if needed
    }

    if ("rgb" in receivers) {
        receivers.rgb(red, green, blue);
    }
    if ("hsl" in receivers) {
        receivers.hsl(...convert.rgb.hsl(red, green, blue) as [number, number, number]);
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