import { useState } from 'react';

export function StaffCard(){
    const staffData = require('../data/25_26_staff.json');

    const [currPhoto, setCurrPhoto] = useState(staffData[0]);
    
    function handleClick(photo){
        setCurrPhoto(photo);
    }

    // const cards = staff.map((member, i) => (
    //     <div key={i} /*className="staff-member"*/>
    //     <div className="about-card-photo-wrapper">
    //         <img src={member.photoUrl} alt={member.name} />
    //     </div>
    //     <div className="a">
    //         {/* <h3>{member.name}</h3> */}
    //         {/* <p>{member.role}</p> */}
    //     </div>
    //     </div>
    // ));

    const cards = staffData.map((staff) => (
        <img src={staff.photoUrl}
            alt={staff.alt}
            onClick={() => setCurrPhoto(staff)}
        />
    ));

    return(
        <div>
            {/* // photo change top layer */}
            <img src={currPhoto.photoUrl} alt={currPhoto.alt }/>

            {/* // the gallery */}
            <div>
                {cards}
            </div>

            {/*the names of all the staff*/}
            <p>{currPhoto.staff}</p>
        </div>
    );
}

export default StaffCard;