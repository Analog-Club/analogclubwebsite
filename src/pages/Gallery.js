import {PageDivider} from '../components/PageDivider'

export function Gallery() {
  const data = require('../data/gallery.json');
  console.log(data)

  const galleryCardSections = Object.keys(data).map((index) => {
    return (
      <div key={data[index].photographerId}>
        <div className="gallery-card-wrapper">
          <GalleryCardHeader folder={data[index]}></GalleryCardHeader>
          <GalleryCard data={data[index].folderContent}></GalleryCard>
        </div>
      </div>
    )
  })

  return (
    <div className="section">
      <PageDivider name="Coming soon"/>
      {/* <PageDivider name="Gallery"/>
      <div className="gallery-section">
        {galleryCardSections}
      </div> */}
    </div>
  );
  
}

export function GalleryCard(props) {
  const galleryCardPhotos = Object.keys(props.data).map((index) => {
    console.log(props.data[index], props.data)
    const photoName = props.data[index].photoName
    const photoUrl = props.data[index].photoUrl
    return (
      <div className="gallery-card">
          <img src={photoUrl} alt ={photoName} className="gallery-img"/>
          <div className="gallery-label">
            <div>"{photoName.toUpperCase()}"</div>
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
