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
                Be a part of our magazine. Submit your photos <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=W9229i_wGkSZoBYqxQYL0">here</a>.
            </span>
        );
    }
    return (
        <div >
            {quote}
        </div>
    );
}
export default Magazine;