import React, { useState } from 'react'
import './Magnify.css'

interface MagnifyProps {
    imageUrl: string
    zoomFactor?: number
    zoomPosition?: 'over' | 'left' | 'right' | 'top' | 'bottom'
}

interface Position {
    x: number
    y: number
}

export const Magnify: React.FC<MagnifyProps> = ({
    imageUrl,
    zoomFactor = 1,
    zoomPosition = 'over',
}) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const zoomedImageWidth = event.currentTarget.offsetWidth * zoomFactor
        const zoomedImageHeight = event.currentTarget.offsetHeight * zoomFactor

        const xOnZoomedImage = event.nativeEvent.offsetX * zoomFactor
        const yOnZoomedImage = event.nativeEvent.offsetY * zoomFactor

        const xOffset = xOnZoomedImage - event.currentTarget.offsetWidth / 2
        const yOffset = yOnZoomedImage - event.currentTarget.offsetHeight / 2

        setPosition({
            x: -Math.min(
                Math.max(0, xOffset),
                zoomedImageWidth - event.currentTarget.offsetWidth
            ),
            y: -Math.min(
                Math.max(0, yOffset),
                zoomedImageHeight - event.currentTarget.offsetHeight
            ),
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

                {isVisible && zoomFactor > 1 && (
                    <div
                        className="magnify-zoom"
                        style={{
                            ...getZoomPosition(),
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: `${position.x}px ${position.y}px`,
                            backgroundSize: `${zoomFactor * 100}%`,
                        }}
                    ></div>
                )}
            </div>
        </div>
    )
}
