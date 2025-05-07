// import {PageDivider} from '../components/PageDivider'
import React, { useState, useEffect } from 'react';

export function Gallery() {
  const data = require('../data/gallery.json');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openModal = (imageUrl, alt, photographerName) => {
    setSelectedImage({ url: imageUrl, alt, photographerName });
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  /* isn't currently being used */
  const galleryCardSections = Object.keys(data).map((index) => {
    return (
      <div key={data[index].photographerId}>
        <div className="gallery-card-wrapper">
          <GalleryCardHeader folder={data[index]}></GalleryCardHeader>
          <GalleryCard 
            data={data[index].folderContent}
            onImageClick={openModal}
            photographerName={data[index].photographerName}
          ></GalleryCard>
        </div>
      </div>
    )
  });

  return (
    <div className="section page">
      <div className="gallery-section">
        {galleryCardSections}
      </div>
      
      <ImageModal 
        isOpen={modalOpen}
        imageUrl={selectedImage?.url}
        alt={selectedImage?.alt}
        photographerName={selectedImage?.photographerName}
        onClose={closeModal}
      />
    </div>
  );
}

export function GalleryCard(props) {
  const galleryCardPhotos = Object.keys(props.data).map((index) => {
    var photoName = props.data[index].photoName
    if (photoName.length > 0) {
      photoName = ("\"" + photoName + "\"").toUpperCase()
    }
    const photoUrl = props.data[index].photoUrl
    return (
      <div className="gallery-card" key={index}>
        <img 
          src={photoUrl} 
          alt={photoName} 
          className="gallery-img"
          onClick={() => props.onImageClick(photoUrl, photoName, props.photographerName)}
          style={{ cursor: 'pointer' }}
        />
        <div className="gallery-label">
          <div>{photoName}</div>
        </div>
      </div>
    )
  })
  return galleryCardPhotos
}

export function GalleryCardHeader(props) {
  const photographer = props.folder.photographerName
  const folderName = props.folder.folderName

  return (
      <div className="gallery-card">
          <div className="gallery-label">
            <div>{folderName.toUpperCase()}</div>
            <div>{photographer.toUpperCase()}</div>
          </div>
      </div>
  )
}

function ImageModal({ isOpen, imageUrl, alt, photographerName, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content">
        <div className="image-modal-main">
          <img src={imageUrl} alt={alt} className="image-modal-img" />
          <button className="image-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="image-modal-sidebar">
          <p>{photographerName}</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
