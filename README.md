# Magnify zone

The Magnify component provides a zoom-in feature for images, similar to a magnifying glass effect. It allows the user to hover over an image and see a magnified version of a specific part of that image.

## Props
Here are the props that you can provide to the Magnify component:

- `imageUrl: string` **(required)**: The source URL of the image that you want to magnify.
- `zoomFactor: number`: A multiplier to determine how much the image should be zoomed. **Default is 1**, which means no 
  zoom.
- `zoomPosition: string`: Determines where the zoomed-in image should be positioned relative to the main image. 
  Possible 
  values are:
  - `over` **(default)**: Over the main image.
  - `left`: To the left of the main image.
  - `right`: To the right of the main image.
  - `top`: Above the main image.
  - `bottom`: Below the main image.

- `zoomWidth: number`: Width of the zoomed-in image in pixels. **Default is 200**.
- `zoomHeight: number`: Height of the zoomed-in image in pixels. **Default is 200**.
- `marginSize: string`: Space between the main image and the zoomed-in image, if positioned to the `left`, `right`, `top`, or 
  `bottom`. 
  **Default is 5px**.
- `mainImageWidth: string`: Width of the main image. **Default is 300px**.

### Notes on Props

- Properties `zoomWidth` and `zoomHeight` expect numbers which will be interpreted as pixels.
- The `marginSize` and `mainImageWidth` properties expect a string, typically representing the size in pixels (e.g., 
  "10px").


## Usage
### When image in `public` folder:
```JS
import { Magnify } from 'magnify-zone';

const Component = () => {
    return (
        <>
            <Magnify imageUrl='/logo.png' zoomFactor={2} />
        </>
    )
}
```

### When image in `src` folder
```JS
import { Magnify } from 'magnify-zone'
import logo from './logo.png' // relative path to image

const Component = () => {
    return (
        <>
            <Magnify
                imageUrl={logo}
                zoomFactor={2}
                zoomPosition="right"
                zoomWidth={250}
                zoomHeight={250}
                marginSize="10px"
                mainImageWidth="400px"
            />
        </>
    )
}
```

## Styles
You can modify or extend the styles for the Magnify component using the provided CSS classes:

- `.magnify-container`: The main container for the Magnify component.
- `.magnify-image-container`: Container for the main image.
- `.magnify-zoom`: The zoomed-in image.


## Notes
- Ensure that the imageUrl you provide is valid, otherwise, the component will not display the image.
- For images in `public`: Use a direct path (e.g., /images/myImage.jpg). 
- For images in `src`: Import them and then use the imported variable.
- If the user's cursor is outside the main image's boundaries, the zoomed-in image will automatically be hidden.
- The zoomFactor prop controls the magnification level of the image when hovered upon. It acts as a multiplier to determine how much larger the magnified area should appear compared to the original size of the image.
  - A zoomFactor of 1 means there is no zoom; the image will be displayed at its original size. 
  - A zoomFactor of 2 means the magnified portion will be displayed at twice its original size, making details within that portion more visible. 
  - Similarly, a zoomFactor of 3 will magnify the image to three times its original size in the zoomed area, and so forth. 
  - In essence, the higher the zoomFactor, the closer and clearer you'll be able to inspect the details of the image within the magnified area. Adjust the zoomFactor based on the level of detail you want users to see when they hover over the image.
