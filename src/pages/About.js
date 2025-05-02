export function About() {
  const data = require('../data/about.json');
  const staff = require('../data/staff.json');

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

  const staffCards = staff.map((member, i) => (
    <div key={i} className="staff-member">
      <img src={member.photoUrl} alt={member.name} />
      <div className="staff-info">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </div>
  ));

  return (
    <div className="about-page"> 
      {/* Left Side: Staff Photos */}
      <div className="about-image staff-container">
        {staffCards}
      </div>

      {/* Right Side: Description */}
      <div className="about-description">
        {aboutCardList}
      </div>
    </div>
  );
}

export default About;