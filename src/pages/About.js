export function About() {
  const data = require('../data/about.json');

  const aboutCardList = Object.keys(data).map((index) => {
    return (
      <div key={data[index]} className="about">  
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

  return (
    <div className="page"> 
      {/* Left Side: Image */}
      <div className="image">
        <img 
          src="images/spaceneedle.png" 
          alt="Space Needle" 
        />
      </div>

      {/* Right Side: Description */}
      <div className="about">
        {aboutCardList}
      </div>
    </div>
  );
}

export default About;