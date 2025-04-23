// import {PageDivider} from '../components/PageDivider'
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export function Gallery() {
  // const data = require('../data/gallery.json');
  // console.log(data)

  // /* Isn't currently being used */
  // const galleryCardSections = Object.keys(data).map((index) => {
  //   return (
  //     <div key={data[index].photographerId}>
  //       <div className="gallery-card-wrapper">
  //         <GalleryCardHeader folder={data[index]}></GalleryCardHeader>
  //         <GalleryCard data={data[index].folderContent}></GalleryCard>
  //       </div>
  //     </div>
  //   )
  // })

  // return (
  //   <div className="section page">
  //     {/* <PageDivider name="Coming soon"/> */}
  //     {/* <PageDivider name="Gallery"/> */}
  //     <div className="gallery-section">
  //       {galleryCardSections}
  //     </div>
  //   </div>
  // );
  
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get the document from Firestore
        const docRef = doc(db, "Photos", "test_series_2"); // Change to your doc ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.name);

          console.log(data)

          // Get image URL from Firebase Storage
          const urls = await Promise.all(
            data.photos.map(async (path) => {
              const imageRef = ref(storage, path);
              return await getDownloadURL(imageRef);
            })
          );
  
          setImageUrls(urls);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Gallery image ${index + 1}`}
              style={{
                width: "19%",
                height: "auto",
                // border: "1px solid #000000",
                margin: "0.5%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
}

export function GalleryCard(props) {
  const galleryCardPhotos = Object.keys(props.data).map((index) => {
    console.log(props.data[index], props.data)
    var photoName = props.data[index].photoName
    if (photoName.length > 0) {
      photoName = ("\"" + photoName + "\"").toUpperCase()
    }
    const photoUrl = props.data[index].photoUrl
    return (
      <div className="gallery-card">
          <img src={photoUrl} alt ={photoName} className="gallery-img"/>
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
export default Gallery;
