declare module 'magnify-zone' {
    import React from 'react'

    export interface MagnifyProps {
        imageUrl: string
        zoomFactor?: number
        zoomPosition?: 'over' | 'left' | 'right' | 'top' | 'bottom'
    }

    const Magnify: React.FC<MagnifyProps>

    export { Magnify }
}
