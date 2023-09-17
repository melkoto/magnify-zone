import React, { useEffect, useState } from 'react'
import './Magnify.css'

interface MagnifyProps {
    imageUrl: string
    zoomFactor?: number
    zoomPosition?: 'over' | 'left' | 'right' | 'top' | 'bottom'
    zoomWidth?: number
    zoomHeight?: number
    marginSize?: string
    mainImageWidth?: string
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
    marginSize = '5px',
    mainImageWidth = '300px',
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
        const imageElement = event.currentTarget.querySelector('img')
        if (!imageElement) return

        const imageRect = imageElement.getBoundingClientRect()

        if (
            event.clientX < imageRect.left ||
            event.clientX > imageRect.right ||
            event.clientY < imageRect.top ||
            event.clientY > imageRect.bottom
        ) {
            setIsVisible(false)
            return
        }

        const containerWidth = imageElement.offsetWidth
        const containerHeight = imageElement.offsetHeight

        const percentageX = (event.clientX - imageRect.left) / containerWidth
        const percentageY = (event.clientY - imageRect.top) / containerHeight

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

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const relatedTarget = e.relatedTarget as HTMLElement
        if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
            return
        }

        setIsVisible(false)
    }

    const handleZoomLeave = () => {
        setIsVisible(false)
    }

    const getZoomPosition = (): React.CSSProperties => {
        switch (zoomPosition) {
            case 'left':
                return {
                    right: '100%',
                    top: '0',
                    marginLeft: `-${marginSize}`,
                }
            case 'right':
                return {
                    left: '100%',
                    top: '0',
                    marginRight: `-${marginSize}`,
                }
            case 'top':
                return {
                    bottom: '100%',
                    left: '0',
                    marginBottom: `-${marginSize}`,
                }
            case 'bottom':
                return {
                    top: '100%',
                    left: '0',
                    marginTop: `-${marginSize}`,
                }
            default:
                return {
                    left: '0',
                    top: '0',
                    position: 'absolute',
                }
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
                <img
                    src={imageUrl}
                    alt="Image"
                    style={{ width: mainImageWidth }}
                />

                {isVisible && zoomFactor > 1 && (
                    <div
                        className="magnify-zoom"
                        onMouseLeave={handleZoomLeave}
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
