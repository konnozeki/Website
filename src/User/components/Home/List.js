import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Card from "./Card";
import "./List.scss"
const List = ({ Category_Name }) => {
    const [infoPhim, setInfoPhim] = useState([]);
    const array2 = [
        { id: 1, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
        { id: 2, Avatar: "	https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
        { id: 3, Avatar: "https://i.pinimg.com/564x/47/39/39/4739399af136287e7358a49b563e81c8.jpg", Name: "Braven" },
        { id: 2, Avatar: "	https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
        { id: 2, Avatar: "	https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
        { id: 4, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala " },
        { id: 6, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala " },
        { id: 7, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala " },
        { id: 8, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala " },
        { id: 5, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala " },
    ];
    const renderListOfPhim = (phims) => {
        // Take only the first 8 elements
        const slicedPhims = phims.slice(0, 8);
    
        return slicedPhims.map((boPhim) => <Card in4phim={boPhim} />);
      };
    return (
        <div className="list">
            <div className="card_container">
                {renderListOfPhim(array2)}
            </div>
            
        </div>
               



            )
}


           




export default List