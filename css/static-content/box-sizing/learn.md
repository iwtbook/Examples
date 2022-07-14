# `box-sizing`

## What is `box-sizing`?

Box sizing is a CSS property that allows you to specify what the
`width` and `height` attributes refer to. By default, they refer
to the box size of the `content-box`. This means that when you set
`400px` as the `width`, the inner-most box width (the content box)
is `400px` wide, and everything else is added on top of that width.

By changing the CSS rule `box-sizing` from `content-box` to `border-box`,
you make it so that the `width` and `height` attributes refer to all
boxes up to the border (the content, padding, and border boxes). With
that, you can know the exact width of your entire element without having
to manually account for the padding and border size.

**NOTE:** the `margin` box is not factored into any of this as that is
considered "outside" the element.
