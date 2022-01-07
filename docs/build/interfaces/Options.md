[Reference - v0.0.1](../README.md) / Options

# Interface: Options

## Table of contents

### Properties

- [format](Options.md#format)
- [raw](Options.md#raw)
- [receivers](Options.md#receivers)

## Properties

### format

• `Optional` **format**: [`SupportedColorNotations`](../modules/internal_.md#supportedcolornotations)

Determines the output format of the generated color.

**`remarks`**
Colors are returned as strings in the CSS <color> data type hexadecimal or functional notation corresponding to the specified format.

**`defaultvalue`** `"hex"`

#### Defined in

[index.ts:40](https://github.com/loucadufault/uuid-color/blob/30a3faf/src/index.ts#L40)

___

### raw

• `Optional` **raw**: `boolean`

Determines whether to skip rounding the generated color components.

**`remarks`**
Only applies when the specified format is `"hsl"`, as this is the only output format that involves a lossy conversion (from RGB model components).

**`defaultvalue`** `false`

#### Defined in

[index.ts:30](https://github.com/loucadufault/uuid-color/blob/30a3faf/src/index.ts#L30)

___

### receivers

• `Optional` **receivers**: [`Receivers`](../modules/internal_.md#receivers)

Attach callbacks to [supported color notations](../modules/internal_.md#supportedcolornotations) as keys that will be called with the corresponding generated color components or code. Eliminates the need to parse the returned string if further manipulation is desired.

**`remarks`**
Does not affect the return value of [the `colorFromUuid` function](../README.md#colorfromuuid).
See [the Receivers type](../modules/internal_.md#receivers) for more details.

#### Defined in

[index.ts:49](https://github.com/loucadufault/uuid-color/blob/30a3faf/src/index.ts#L49)
