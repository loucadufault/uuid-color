import { validate as isValidUuid } from "uuid";
import * as UuidEncoder from "uuid-encoder";
import * as convert from "color-convert";


type SupportedColorNotations =  "hex" | "rgb" | "hsl";

type Receivers = {
    hex?: (hexString: string) => void;
    rgb?: (red: number, green: number, blue: number, alpha?: number) => void;
    hsl?: (hue: number, saturation: number, lightness: number, alpha?: number) => void;
}

export interface Options {
    /**
     * Determines whether to skip rounding the generated color components.
     * 
     * @remarks
     * Only applies when the specified format is `"hsl"`, as this is the only output format that involves a lossy conversion (from RGB model components).
     * 
     * @defaultValue `false`
     */
    raw?: boolean;

    /**
     * Determines the alpha of the generated color as a number between 0 and 1. Passed through to the final generated color without any involvement in the generation process.
     * 
     * @remarks
     * Specifying any value (even if it is equal to or greater than 1) will cause the function to return the generated color as a notation string including the alpha component (see the alpha variants in {@link Options.format | Options.format}), and cause the alpha to be included in the parameter(s) of the call to the supplied {@link Receivers} value(s).
     * Values are not validated, but are clamped to between 0 and 1.
     * 
     * @defaultValue `1`
     */
    alpha?: number

    /**
     * Determines the output format of the generated color.
     * 
     * hex: #rrggbb[aa]
     * rgb: rgb[a](R, G, B[, A])
     * hsl: hsl[a](H, S, L[, A])
     * @see { @link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value | \<color\> }
     * 
     * @remarks
     * Colors are returned as strings in the CSS <color> data type hexadecimal or comma-separated functional notation corresponding to the specified format.
     * 
     * @defaultValue `"hex"`
     */
    format?: SupportedColorNotations;

    /**
     * Attach callbacks to {@link SupportedColorNotations | supported color notations} as keys that will be called with the corresponding generated color components or code. Eliminates the need to parse the returned string if further manipulation is desired.
     * 
     * @remarks
     * Does not affect the return value of {@link colorFromUuid | the `colorFromUuid` function}.
     * 
     * @see {@link Receivers | the Receivers type}
     */
    receivers?: Receivers;
}


const DEFAULT_COLOR_FORMAT = "hex";
const DEFAULT_IS_RAW = false;

const encoder = new UuidEncoder("base10");


/**
 * Returns the generated color associated with the given uuid.
 * 
 * @param uuid - The uuid for which to generate a color
 * @param options - An optional object to configure the color generation, and attach callbacks that directly receive the generated color code or components in various formats
 * @returns The generated color as a CSS `<color>` notation string
 * 
 * @throws {@link https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/error | Error}
 * This exception is thrown if the input uuid string is not a valid UUID.
 * 
 * @public
 */
export function colorFromUuid(uuid: string, options: Options = {}): string {
    if (!isValidUuid(uuid)) {
        throw new Error("Given string is not a valid UUID.");
    }

    const encodedUuid = BigInt(encoder.encode(uuid));

    const colorCode = Number(encodedUuid % BigInt(0x1000000));
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

    let isRaw = DEFAULT_IS_RAW;
    if (options.hasOwnProperty("raw")) {
        isRaw = options.raw;
    }

    let alpha: number;
    if (options.hasOwnProperty("alpha")) {
        alpha = Math.min(Math.max(options.alpha, 0), 1); // clamp to [0; 1]
    }

    if ("rgb" in receivers) {
        if (alpha === undefined) {
            receivers.rgb(red, green, blue);
        } else {
            receivers.rgb(red, green, blue, alpha);
        }
    }
    if ("hsl" in receivers) {
        const hsl = isRaw ? convert.rgb.hsl.raw(red, green, blue) : convert.rgb.hsl(red, green, blue);
        if (alpha === undefined) {
            receivers.hsl(...hsl as [number, number, number]);

        } else {
            receivers.hsl(...[...hsl, alpha] as [number, number, number, number]);
        }
    }
    if ("hex" in receivers) {
        const hexColorCode = convert.rgb.hex(red, green, blue).toLowerCase();
        if (alpha === undefined) {
            receivers.hex(hexColorCode);
        } else {
            const hexAlphaCode = Math.floor((alpha * 255)).toString(16);
            receivers.hex(hexColorCode + hexAlphaCode);
        }
    }

    let format = DEFAULT_COLOR_FORMAT;
    if (options.hasOwnProperty("format")) {
        format = options.format;
    }

    switch (format) {
        case "rgb":
            return alpha === undefined ? `rgb(${red}, ${green}, ${blue})` : `rgb(${red}, ${green}, ${blue}, ${alpha})`;
        case "hsl":
            const hsl = isRaw ? convert.rgb.hsl.raw(red, green, blue) : convert.rgb.hsl(red, green, blue);
            return alpha === undefined ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${alpha})`;
        default: // don't error
        case "hex":
            const hexColorCode = convert.rgb.hex(red, green, blue).toLowerCase();
            const hexAlphaCode = Math.floor((alpha * 255)).toString(16);
            return alpha === undefined ? `#${hexColorCode}` : `#${hexColorCode}${hexAlphaCode}`;
    }
}
