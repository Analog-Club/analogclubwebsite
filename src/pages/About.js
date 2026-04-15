import {StaffCard} from '../pages/StaffCard.js';
export function About() {
  const data = require('../data/about.json');
  const staff = require('../data/25_26_staff.json');

  const currPhoto = staff.map((member, i) => (
    <div key={i}>
      <div className="about-card-photo-wrapper">
        <img src={member.photoUrl} alt={member.alt}/>
      </div>
    </div>
  ));

  const aboutCardList = Object.keys(data).map((index) => {
    return (
      <div key={data[index]} className="about-description">  
        <div className="text">
          <div className="about-card-wrapper">
            <div className="about-card-text-wrapper">
              <h1>{data[index].title}</h1>
              <p>{data[index].desc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // const staffCards = staff.map((member, i) => (
  //   <div key={i} /*className="staff-member"*/>
  //     <div className="about-card-photo-wrapper">
  //       <img src={member.photoUrl} alt={member.name} />
  //     </div>
  //     <div className="a">
  //       {/* <h3>{member.name}</h3> */}
  //       {/* <p>{member.role}</p> */}
  //     </div>
  //   </div>
  // ));

  return (
    <div className="a">
      <div className="desc-photos">
        {/* Left Side: Staff Photos */}
        <div className="about-image about-card-photo-wrapper"> 
          {StaffCard}
        </div>

        {/* Right Side: Description */}
        <div className="about-description">
          {aboutCardList}
        </div>
      </div> 
    </div>
  );
}

export default About;