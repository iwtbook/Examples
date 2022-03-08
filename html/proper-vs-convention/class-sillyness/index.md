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
