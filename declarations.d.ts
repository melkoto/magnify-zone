declare module 'magnify-zone' {
    import React from 'react'

    export interface MagnifyProps {
        imageUrl: string
        zoomFactor?: number
        zoomPosition?: 'over' | 'left' | 'right' | 'top' | 'bottom'
        zoomWidth?: number
        zoomHeight?: number
        marginSize?: string
        mainImageWidth?: string
    }

    const Magnify: React.FC<MagnifyProps>

    export { Magnify }
}
