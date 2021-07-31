# React Lazy Image


[live demo](https://6iw2h.csb.app/)

## Install

```
  // npm
  npm install @odnh/react-lazy-image

  // yarn
  yarn add @odnh/react-lazy-image
```

## Use

```jsx
import LazyImage from "@odnh/react-lazy-image";

function App() {
  const imageUrl = "...";

  return (
    <section class="app">
      <LazyImage src={imageUrl} distance="50px 0" title="image" alt="alt" />
    </section>
  );
}
```

### props

| name                     | type                  | description                                  | default value |
| ------------------------ | --------------------- | -------------------------------------------- | ------------- |
| distance                 | `string` (css margin) | Adjusting the distance to enter the viewport | '10%'         |
| {{ img tag attributes }} | `ImgHTMLAttributes`   | attribute of img tag                         | -             |
