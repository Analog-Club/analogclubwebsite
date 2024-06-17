export function Resources() {
  const data = require('../data/resources.json');

  const resourcesCardList = Object.keys(data).map((index) => {
    return (
      <div>
        <div key={data[index]} className='resource-card-wrapper'>
          <img src={data[index].photoUrl} alt ={data[index].title}/>
          <div className='resource-card-text-wrapper'>
              <h1>
                {data[index].title}
              </h1>
              <p>
                {data[index].desc}
              </p>
          </div>
        </div>
      </div>
    )
  })
  return (
    <div className="Resources">
      {resourcesCardList}
    </div>
  );
}

export default Resources;