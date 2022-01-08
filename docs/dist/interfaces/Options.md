[Reference - v0.1.0](../README.md) / Options

# Interface: Options

## Table of contents

### Properties

- [alpha](Options.md#alpha)
- [format](Options.md#format)
- [raw](Options.md#raw)
- [receivers](Options.md#receivers)

## Properties

### alpha

• `Optional` **alpha**: `number`

Determines the alpha of the generated color as a number between 0 and 1. Passed through to the final generated color without any involvement in the generation process.

**`remarks`**
Specifying any value (even if it is equal to or greater than 1) will cause the function to return the generated color as a notation string including the alpha component (see the alpha variants in [Options.format](Options.md#format)), and cause the alpha to be included in the parameter(s) of the call to the supplied [Receivers](../modules/internal_.md#receivers) value(s).
Values are not validated, but are clamped to between 0 and 1.

**`defaultvalue`** `1`

#### Defined in

[index.ts:34](https://github.com/loucadufault/uuid-color/blob/1d2a5c0/src/index.ts#L34)

___

### format

• `Optional` **format**: [`SupportedColorNotations`](../modules/internal_.md#supportedcolornotations)

Determines the output format of the generated color.

hex: #rrggbb[aa]
rgb: rgb[a](R, G, B[, A])
hsl: hsl[a](H, S, L[, A])

**`see`** { @link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value | \<color\> }

**`remarks`**
Colors are returned as strings in the CSS <color> data type hexadecimal or comma-separated functional notation corresponding to the specified format.

**`defaultvalue`** `"hex"`

#### Defined in

[index.ts:49](https://github.com/loucadufault/uuid-color/blob/1d2a5c0/src/index.ts#L49)

___

### raw

• `Optional` **raw**: `boolean`

Determines whether to skip rounding the generated color components.

**`remarks`**
Only applies when the specified format is `"hsl"`, as this is the only output format that involves a lossy conversion (from RGB model components).

**`defaultvalue`** `false`

#### Defined in

[index.ts:23](https://github.com/loucadufault/uuid-color/blob/1d2a5c0/src/index.ts#L23)

___

### receivers

• `Optional` **receivers**: [`Receivers`](../modules/internal_.md#receivers)

Attach callbacks to [supported color notations](../modules/internal_.md#supportedcolornotations) as keys that will be called with the corresponding generated color components or code. Eliminates the need to parse the returned string if further manipulation is desired.

**`remarks`**
Does not affect the return value of [the `colorFromUuid` function](../README.md#colorfromuuid).

**`see`** [the Receivers type](../modules/internal_.md#receivers)

#### Defined in

[index.ts:59](https://github.com/loucadufault/uuid-color/blob/1d2a5c0/src/index.ts#L59)
