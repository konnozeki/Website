import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import { Button, Form, Input, Typography } from 'antd';
import "./Search.scss"

const SearchBar = ({ childToParent }) => {


    const [theLoai, setTheLoai] = useState([]);

    const [suggestions, setSuggestions] = useState([]); //ketqua

    const [tuKhoa, setTuKhoa] = useState([]);


    const onSelectOptions = (selectedList, selectedItem) => {
        setTuKhoa([...tuKhoa, selectedItem]);
        //setTuKhoa([selectedList]);
        console.log("da chon", {tuKhoa});
    };
    const onRemoveOptions = (selectedList, removedItem) => {
        setTuKhoa(tuKhoa.slice(tuKhoa.indexOf(removedItem)));
        
        console.log("da chon", { tuKhoa });
    };
 
  

    const [hideSuggestions, setHideSuggestions] = useState(true);
    useEffect(() => {
        const getTheLoai = async () => {

            const getTenTheLoai = [{ name: "Option 1", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
  { name: "Option 4", id: 4 },
  { name: "Option 5", id: 5 }];
            //const reqData = await fetch("http://localhost/devopsdeveloper/country");
            //const resData = await reqData.json();
            

           // for (let i = 0; i < resData.length; i++) {
             //   getcountryname.push(resData[i].nicename);
           // }
            setTheLoai(getTenTheLoai);
        }
        getTheLoai();
        
    },[]);
    useEffect(() => {
       
        const fetchData = async () => {
            
            try {
                const getKetQuaTimKiem = [
                    { id: 1, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
                    { id: 2, Avatar: "	https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
                    { id: 3, Avatar: "https://i.pinimg.com/564x/47/39/39/4739399af136287e7358a49b563e81c8.jpg", Name: "Braven" },
                    { id: 4, Avatar: "	https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala Gundala" },
                    { id: 1, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
                    { id: 2, Avatar: "	https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
                    { id: 3, Avatar: "https://i.pinimg.com/564x/47/39/39/4739399af136287e7358a49b563e81c8.jpg", Name: "Braven" },
                ];
                
                
                //const reqData = await fetch("http://localhost/devopsdeveloper/country");
                //const resData = await reqData.json();


                // for (let i = 0; i < resData.length; i++) {
                //   getcountryname.push(resData[i].nicename);
                // }
                
                setSuggestions(getKetQuaTimKiem);
                
        } catch (error) {
            console.log(error);
        }
    };

       

        fetchData();
    }, [tuKhoa]);
    

    return (<React.Fragment>

            <div className="row">
                <div className="col-sm-12">
                    

                <form className="row g-3" method='post' onSubmit={(event) => { console.log(event) }}>

                        <div className="col-md-5">
                            

                            <div className="text-dark">
                                <Multiselect
                                isObject={false}
                                options={theLoai}
                                
                                
                                onRemove={onRemoveOptions}
                                
                                onSelect={onSelectOptions}
                                selectedValues={tuKhoa}
                                
                                showCheckbox
                                
                                                     
                               / >

                            </div>
                    </div>
                    <Button className='button-search' onClick={() => {
                       
                        
                        childToParent(suggestions);
                    
                    }
                    }>
                        Search
                    </Button>
                    </form>
                </div>
        </div>

       

    </React.Fragment>);
}

export default SearchBar