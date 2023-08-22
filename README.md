# Magnify zone

Library to zoom in image on hover.   

Image location: `public/img/image.png`

Props:
- `imageUrl: string` - url from public folder
- `zoomFactor: number` - positive number. **Default**: `1`
- `zoomPosition: string` - `over`, `left`, `right`, `top`, `bottom`. **Default**: `over`


## Usage
```JS
import { Magnify } from 'maginify-zone'

const Compenent = () => {
    return (
        <>
            <Magnify imageUrl='/img/image.png' zoomFactor={2} />
        </>
    )
}
```
