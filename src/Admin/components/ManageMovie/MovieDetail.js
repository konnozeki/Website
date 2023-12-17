import { Button, Image, Input, Popconfirm, message } from 'antd';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "./MovieDetail.scss"

const confirm = (e) => {
    message.success('Change successfully!');
};

function MovieDetail() {

    const { title } = useParams();
    const titleMovie = decodeURIComponent(title)

    return (
        <div className='movie-detail-container'>

            <div className='image-movie'>

                <Image className='movie-image' width={300} height={420}
                    src="https://i.pinimg.com/564x/20/2a/a2/202aa259454320d63365817ea1128023.jpg" preview={false} />
            </div>

            {/* <div className='space-gap'>Hello</div> */}
            <div className='detail-movie'>
                <div className='detail'>
                    <Input className="detail-infor" placeholder='Name Movie' size='large' defaultValue={decodeURIComponent(titleMovie)} />
                </div>
                <div className='detail'>
                    <Input className="detail-infor" placeholder='Year Production' size='large' />
                </div>
                <div className='detail'>
                    <Input.TextArea className="detail-infor" placeholder='Description' rows={5} size='large' />
                </div>
                <div className='detail'>
                    <Input className="detail-infor" placeholder='Type' size='large' />
                </div>
                <div>
                    <Popconfirm
                        title="Change information"
                        description="Are you sure to change?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ backgroundColor: "red", color: "white" }}>Change</Button>

                    </Popconfirm>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail