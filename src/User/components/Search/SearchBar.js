import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import { Button, Form, Input, Typography } from 'antd'
function SearchBar() {


    const [theLoai, setTheLoai] = useState([]);

    const [suggestions, setSuggestions] = useState([]); //ketqua
    const [tuKhoa, setTuKhoa] = useState([]);

    const [hideSuggestions, setHideSuggestions] = useState(true);
    useEffect(() => {
        const getTheLoai = async () => {

            const getTenTheLoai = [{ "1": 1}, { "2": 2}];
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
                const getKetQuaTimKiem = [{ "1": 1 }, { "3": 3 }];


                
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
                            <label className="form-label"> </label>

                            <div className="text-dark">
                                <Multiselect
                                isObject={false}
                                selectedValues={tuKhoa}
                                onRemove={(event) => {
                                    console.log(event)
                                    tuKhoa.pop({});
                                    // }

                                    setTuKhoa(tuKhoa);
                                    
                                }}
                                onSelect={(event) => {
                                    tuKhoa.push(Object);
                                    // }

                                    setTuKhoa(tuKhoa);
                                    console.log(event)
                                }}
                                options={theLoai}
                                onSearch={(tuKhoa) => {
                                    console.log('Value', value)
                                }}
                                showCheckbox

                                                     
                               / >

                            </div>
                    </div>
                    <input type="submit"/>
                    </form>
                </div>
        </div>

        <div
            className="kq">
            {theLoai.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div>
                        {suggestions.map((suggestions) => (
                            <p>ketqua.</p>
                            
                        ))}
                </div>
            )}
            
        </div>
         

    </React.Fragment>);
}

export default SearchBar