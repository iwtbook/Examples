# Class Sillynesss

In this example we are taking a look at the abuse of classes with CSS frameworks like Tailwind. Take a look at the two examples below:

## Examples

### Vanilla HTML & CSS

```html
<!-- index.html -->
<button class="primary">Primary</button>
<button class="secondary">Secondary</button>
<button class="warning">Warning</button>

<!-- styles.css -->
<style>
  button {
    border-style: solid;
    border-width: 0px;
    border-radius: 8px;
    color: white;
    font-size: 18px;
    padding: 8px 20px;
  }

  button.primary {
    background-color: #3B82F6;
  }

  button.secondary {
    background-color: #6B7280;
  }

  button.warning {
    background-color: #F59E0B;
  }
</style>
```

### Tailwind.css

```html
<!-- index.html -->
<button class="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg
rounded-lg focus:border-4 border-blue-300">Primary</button>
<button class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg
rounded-lg focus:border-4 border-gray-300">Secondary</button>
<button class="p-2 pl-5 pr-5 bg-yellow-500 text-gray-100 text-lg
rounded-lg focus:border-4 border-yellow-300">Warning</button>
```

## Comparing the two

As computer scientists we might initially be drawn towards the second example, it seems to be a more efficient use of space and we don't even have to leave our markup to be able to style something.

We should be cautious of thinking this way though - there are some drawbacks that might not catch the eye initially:

### 1. Maintainability

It's difficult to employ any sort of structure to your styles when they balloon out of control on every element they touch, like in the second example. Unlike vanilla CSS where you can organize with clear selectors and give properties space on their own line to be easily read, utility classes inherently have to be read, written, and debugged in one continuous line.

### 2. Reuse

Even though Tailwind's utility classes use less characters than vanilla HTML & CSS in the above example, the redundancy is through the roof. Of the 9 classes that each element has, only 2 are unique, meaning that 78% of the classes are identical between them. To add insult to injury, if we continue to add more buttons, the utility classes will keep multiplying to the point where they are no longer saving any space.

An additional side affect of this is that something as simple as changing the border radius on the buttons requires you to manually comb through the class list of each individual button to update the corresponding class.

### 3. Semantics

Lastly we get to the semantics: What are classes designed for? The intent of a class is to describe the purpose of an element, not to describe how the element looks. Class names should remain logical despite what the element looks like. [**NEEDS SOURCE** - or at least a better one than MDN [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)]
