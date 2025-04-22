

import React from 'react'
// import Autoplay from 'embla-carousel-autoplay'
// import useEmblaCarousel from 'embla-carousel-react'
import { GalleryCard } from "./Gallery";
import {PageDivider} from '../components/PageDivider'
import { GalleryCardHeader } from "./Gallery";
// import { NavLink } from "react-router-dom";
function Home() {
  const data = require('../data/all_photos.json');
  var as = []
  for (var i in data) 
    as.push(data[i])
  console.log(as)


  /* Isn't currently being used */
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
  console.log(Array.from(Array(galleryCardSections).keys()))

  // const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  console.log(Array.from(Array(SLIDE_COUNT).keys()))
  return (
    <div className="home-page">
      {/* <EmblaCarousel slides={as} options={OPTIONS}></EmblaCarousel> */}
      {/* <NavLink to ="/gallery" className="redirect-container"> EXPLORE THE GALLERY ➔</NavLink> */}

      <PageDivider name="Thanks for checking us out! Our site is currently under development..."/>
    </div>
  );
}



// const EmblaCarousel = (props) => {
//   const { slides, options } = props
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 3000 })])

//   return (
//     <section className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {slides.map((index) => (
//             <div className="embla__slide" key={index}>
//               <img className="home-img" src={index.photoUrl} alt="" />

//               {/* <div className="embla__slide__number">{index + 1}</div> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

export default Home;