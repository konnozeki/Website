import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Movies.scss"

function Movies() {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/Register');
    }


    return (
        <>
            <div className="container">
                <div className='Movies'>
                    <div className="row-container">
                        <div className="row-item-wrap">
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">
                                    <div>
                                        <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                            <div className="thumbnail-box" onClick={handleFilmClick}>

                                                <span>
                                                    <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                                </span>
                                                <div className="update-info-layer">
                                                    <div className="last-update">Ep 1</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>


                    <div className="row-container">
                        <div className="row-item-wrap">
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">
                                    <div>
                                        <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                            <div className="thumbnail-box" onClick={handleFilmClick}>

                                                <span>
                                                    <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                                </span>
                                                <div className="update-info-layer">
                                                    <div className="last-update">Ep 1</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>


                    <div className="row-container">
                        <div className="row-item-wrap">
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">
                                    <div>
                                        <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                            <div className="thumbnail-box" onClick={handleFilmClick}>

                                                <span>
                                                    <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                                </span>
                                                <div className="update-info-layer">
                                                    <div className="last-update">Ep 1</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>


                    <div className="row-container">
                        <div className="row-item-wrap">
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">
                                    <div>
                                        <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                            <div className="thumbnail-box" onClick={handleFilmClick}>

                                                <span>
                                                    <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                                </span>
                                                <div className="update-info-layer">
                                                    <div className="last-update">Ep 1</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>


                    <div className="row-container">
                        <div className="row-item-wrap">
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row-item">
                                <div className="img-wrap pull-hover">
                                    <div>
                                        <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                            <div className="thumbnail-box" onClick={handleFilmClick}>

                                                <span>
                                                    <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                                </span>
                                                <div className="update-info-layer">
                                                    <div className="last-update">Ep 1</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="row-item">
                                <div className="img-wrap pull-hover">


                                    <div className="thumbnail-box" onClick={handleFilmClick}>

                                        <span>
                                            <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                                        </span>
                                        <div className="update-info-layer">

                                            <div className="last-update">Ep 1</div>


                                        </div>
                                    </div>


                                    <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                                        <div className="text-box" onClick={handleFilmClick}>
                                            <div className="title">TÊn phim</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>


                
                </div>

            </div>
        </>

    )
}

export default Movies