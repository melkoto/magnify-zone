import React, { useState } from 'react'
import './Magnify.css'

export const Magnify = ({ imageUrl, zoomFactor, zoomPosition = 'over' }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    const handleMouseMove = (event) => {
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

    const getZoomPosition = () => {
        const margin = 10

        switch (zoomPosition) {
            case 'left':
                return {
                    right: '100%',
                    top: '0',
                    transform: `translateX(${margin}px)`,
                }
            case 'right':
                return {
                    left: '100%',
                    top: '0',
                    transform: `translateX(-${margin}px)`,
                }
            case 'top':
                return {
                    bottom: '100%',
                    left: '0',
                    transform: `translateY(${margin}px)`,
                }
            case 'bottom':
                return {
                    top: '100%',
                    left: '0',
                    transform: `translateY(-${margin}px)`,
                }
            default: // over
                return { left: '0', top: '0', position: 'absolute' }
        }
    }

    return (
        <div
            className="magnify-container"
            style={{ width: '200px', height: '200px' }}
        >
            <div
                className="magnify-image-container"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={imageUrl}
                    alt="Image"
                    style={{ width: '100%', height: '100%' }}
                />
                {isVisible && zoomFactor > 0 && (
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
