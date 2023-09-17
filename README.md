# Magnify zone

Library to zoom in image on hover.   

Props:
- `imageUrl: string` - url to image
- `zoomFactor: number` - positive number. **Default**: `1`
- `zoomPosition: string` - `over`, `left`, `right`, `top`, `bottom`. **Default**: `over`


## Usage
```JS
import { Magnify } from 'maginify-zone'
import logo from './logo.png'

const Compenent = () => {
    return (
        <>
            <Magnify imageUrl={logo} zoomFactor={2} />
        </>
    )
}
```

If image in `public/img` folder:
```JS
import { Magnify } from 'maginify-zone'

const Compenent = () => {
    return (
        <>
            <Magnify imageUrl='/img/logo.png' zoomFactor={2} />
        </>
    )
}
```
