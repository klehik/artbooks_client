import React, { useState, useCallback, useEffect } from 'react'
import { Image } from 'react-bootstrap'

import ImageViewer from 'react-simple-image-viewer'

const ImageView = ({ filenames }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(filenames)
  }, [])

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }
  images.map((src, index) => {
    console.log(src, index)
  })

  const leftArrow = <div style={{ color: 'black' }}>{'<'}</div>
  const rightArrow = <div style={{ color: 'black' }}>{'>'}</div>

  return (
    <div>
      {images.map((src, index) => (
        <Image
          className="preview-img"
          src={src}
          onClick={() => openImageViewer(index)}
          width="250"
          key={index}
          style={{ margin: '2px' }}
          alt=""
        />
      ))}

      {isViewerOpen && (
        <ImageViewer
          leftArrowComponent={leftArrow}
          rightArrowComponent={rightArrow}
          backgroundStyle={{ backgroundColor: 'white', color: 'black' }}
          src={images}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  )
}

export default ImageView
