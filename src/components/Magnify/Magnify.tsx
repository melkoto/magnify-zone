import React, { useEffect, useState } from 'react'
import './Magnify.css'

interface MagnifyProps {
    imageUrl: string
    zoomFactor?: number
    zoomPosition?: 'over' | 'left' | 'right' | 'top' | 'bottom'
    zoomWidth?: number
    zoomHeight?: number
}

interface Position {
    x: number
    y: number
}

export const Magnify: React.FC<MagnifyProps> = ({
    imageUrl,
    zoomFactor = 1,
    zoomPosition = 'over',
    zoomWidth = 200,
    zoomHeight = 200,
}) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [zoomedImageWidth, setZoomedImageWidth] = useState<number>(
        zoomWidth * zoomFactor
    )
    const [zoomedImageHeight, setZoomedImageHeight] = useState<number>(
        zoomHeight * zoomFactor
    )

    useEffect(() => {
        setZoomedImageWidth(zoomWidth * zoomFactor)
        setZoomedImageHeight(zoomHeight * zoomFactor)
    }, [zoomWidth, zoomHeight, zoomFactor])

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const containerWidth = event.currentTarget.offsetWidth
        const containerHeight = event.currentTarget.offsetHeight

        const percentageX = event.nativeEvent.offsetX / containerWidth
        const percentageY = event.nativeEvent.offsetY / containerHeight

        const xOnZoomedImage = zoomedImageWidth * percentageX
        const yOnZoomedImage = zoomedImageHeight * percentageY

        const xOffset = xOnZoomedImage - zoomWidth / 2
        const yOffset = yOnZoomedImage - zoomHeight / 2

        const minXOffset = 0
        const minYOffset = 0
        const maxXOffset = zoomedImageWidth - zoomWidth
        const maxYOffset = zoomedImageHeight - zoomHeight

        setPosition({
            x: -Math.min(Math.max(xOffset, minXOffset), maxXOffset),
            y: -Math.min(Math.max(yOffset, minYOffset), maxYOffset),
        })
    }

    const handleMouseEnter = () => {
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setIsVisible(false)
    }

    const getZoomPosition = (): React.CSSProperties => {
        switch (zoomPosition) {
            case 'left':
                return {
                    right: '100%',
                    top: '0',
                }
            case 'right':
                return {
                    left: '100%',
                    top: '0',
                }
            case 'top':
                return {
                    bottom: '100%',
                    left: '0',
                }
            case 'bottom':
                return {
                    top: '100%',
                    left: '0',
                }
            default:
                return { left: '0', top: '0', position: 'absolute' }
        }
    }

    return (
        <div className="magnify-container">
            <div
                className="magnify-image-container"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={imageUrl} alt="Image" />

                {zoomFactor > 1 && (
                    <div
                        className="magnify-zoom"
                        style={{
                            ...getZoomPosition(),
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: `${position.x}px ${position.y}px`,
                            backgroundSize: `${zoomedImageWidth}px ${zoomedImageHeight}px`,
                            opacity: isVisible ? 1 : 0,
                            height: `${zoomHeight}px`,
                            width: `${zoomWidth}px`,
                        }}
                    ></div>
                )}
            </div>
        </div>
    )
}
