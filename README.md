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

| name                     | type                   | description                                                                                                                                                          | default value |
| ------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| distance                 | `string` (css margin)  | Adjusting the distance to enter the viewport [more](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer)    | '10%'         |
| threshold                | `number` or `number[]` | The criteria by which the image appears (ratio) [more](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer) | 0.0           |
| {{ img tag attributes }} | `ImgHTMLAttributes`    | attributes of img tag                                                                                                                                                | -             |
