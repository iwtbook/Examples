# Color Pickers

In this example we are taking a look at one of the tools the web platform has to offer so we don't have to reinvent the wheel.

## Examples

### Vanilla HTML & CSS

```html
<input type="color" />
```

### 3rd Party Library

```html
<input data-jscolor="{}" />
```

## Comparing the two

*Developer Experience:* The two pieces of markup seem to be identical, so from a code writing view there doesn't seem to be much gain in using the 3rd party library.

*User Experience:* Let's look over at how they render in the `Web View` panel on the right. Visually, they're again very similar, the only difference being the 3rd party color picker's text input being visible at all times instead of in the hidden menu. In fact the native color picker has more features, allowing for non-hex color formats to be selected from.

*Accessibility Concerns:* Screen readers and other assistive devices are usually built using the native web platform in mind, so they might have a hard time handling a custom input element. The
markup that the 3rd party library uses does not have a `type` attribute on it, so assistive devices will likely default to treating it as a plain text input. Other attributes might need to be added to that element to aid such devices.

*Maintainability Concerns:* Since `<input type="color" />` is native to the web platform, browser vendors are forced to put it through rigorous tests, making sure that it works with every new browser update. Any 3rd party library that you add to your project has the possibility that there weren't enough test cases and a bug slips through, or even worse that the developer decides to stop updating that library all together. You have to decide if that risk is worth accepting any library you add.

## Conclusion

For virtually the same markup and slightly worse end results, we have incurred and extra 62 KB. This demo is not so much about color pickers in particular, but about knowing the web platform and what's available to you.

Without the knowledge that this native color picker existed, the 3rd party library might sound completely reasonable. Now that we are aware of the existance of `<input type="color" />` though, we should use it most every time.
