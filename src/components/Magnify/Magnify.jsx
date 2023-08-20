import { useState } from 'react'

import './Magnify.css'

export const Magnify = ({ imageUrl, zoomFactor }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseEnter = () => {
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setIsVisible(false)
    }

    const { x, y } = position

    return (
        <div className="magnify-container">
            <div
                className="magnify-image-container"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={imageUrl} alt="Image" />
                {isVisible && (
                    <div
                        className="magnify-zoom"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: `-${x * zoomFactor}px -${
                                y * zoomFactor
                            }px`,
                            transform: `scale(${1 / zoomFactor})`,
                        }}
                    ></div>
                )}
            </div>
        </div>
    )
}
