import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { GalleryCard } from "./Gallery";
import { GalleryCardHeader } from "./Gallery";
import { NavLink } from "react-router-dom";

function Home() {
  const photoData = require('../data/all_photos.json');
  const magazineData = require('../data/magazine.json');
  // const opencallData = require('../data/opencall.json');
  // const photowalksData = require('../data/photowalks.json');

  // const photowalk = photowalksData[0];
  const magazine = magazineData[0];
  // const opencall = opencallData[0];

  var as = []
  for (var i in photoData) 
    as.push(photoData[i])
  console.log(as)

  /* Isn't currently being used */
  const galleryCardSections = Object.keys(photoData).map((index) => {
    return (
      <div key={photoData[index].photographerId}>
        <div className="gallery-card-wrapper">
          <GalleryCardHeader folder={photoData[index]}></GalleryCardHeader>
          <GalleryCard photoData={photoData[index].folderContent}></GalleryCard>
        </div>
      </div>
    )
  })
  console.log(Array.from(Array(galleryCardSections).keys()))

  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  console.log(Array.from(Array(SLIDE_COUNT).keys()))

  return (
    <div className="home-page">
      {/* <div className="page-divider">THIS WEEK'S HIGHLIGHTS</div> */}

      { /* Magazine section */ }
      <div className="magazine-home">
        <div className="fix-position">
          <a href="https://analog-club-uw.square.site/" className='redirect-container' style={{ textDecoration: 'none' }}>ORDER NOW</a>
        </div>
        <img src={magazine.photoUrl} alt={magazine.title}></img>
      </div>

      { /* Opencall section */ }

      { /* Gallery section */ }
      <EmblaCarousel slides={as} options={OPTIONS}></EmblaCarousel>
      <NavLink to ="/gallery" className="redirect-container"> EXPLORE THE GALLERY ➔</NavLink>
      
      { /* Photowalk section */ } 
      {/* Commenting out for now! */}
      {/* <div className="photowalk-home">
        <img src={photowalk.photoUrl} alt={photowalk.photoName}></img>
        <div>
          <p className="title">PHOTO WALK:</p>
          <p className="subtitle">{photowalk.theme}</p>
          <p>PHOTOGRAPHER: {photowalk.photographer}</p>
          <p>FILM STOCK: {photowalk.filmStock}</p>
        </div>
      </div> */}
      
    </div>
  );
}



const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, ] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 3000 })])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img className="home-img" src={index.photoUrl} alt="" />

              {/* <div className="embla__slide__number">{index + 1}</div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


/*
export function Magazine() {
  const data = require('../data/magazine.json');
  
  const magazineCardSections = Object.keys(data).map((key) => {
      return (
          <div key={data[key]}>
              <div className="magazine-header">
                  {key.toUpperCase()}  
              </div>
              <MagazineCard data={data[key]} category={key} />
          </div>
      )
    });

  return (
    <div className="Magazine">
      <div className="magazine-section">
          {magazineCardSections}
      </div> 
    </div>
  );
}

export function MagazineCard(props) {
  const data = props.data;
  const magazineCardList = Object.keys(data).map((index) => {
      
      return (
        <div className="magazine-card-wrapper">
          <img src={data[index].photoUrl} alt ={data[index].title}/>
          <div className='magazine-card-text-wrapper'>
              <h1>
                  {data[index].title}
              </h1>
              <p>
                  {data[index].desc}
              </p>
              <p>
              <UrlQuote category={props.category}/>
              </p>
              <p className="magazine-card-text-deadline">
                  {data[index].deadline}
              </p> 
          </div>
        </div>
      )
    });
    return magazineCardList;
}
  
export function UrlQuote(props) {
  const category = props.category;
  var quote = "";
  if(category.toLowerCase() === "opencall") {
      quote = (
          <span>
              Be a part of our magazine. Submit your photos <a href="">here</a>.
          </span>
      );
  }
  return (
      <div >
          {quote}
      </div>
  );
}*/






export default Home;