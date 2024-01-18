import Container from 'react-bootstrap/Container';
import axios from 'axios';
import NavbarCompt from '../component/NavbarCompt';
import { ListGroup } from 'react-bootstrap';
import '../assets/css/home.css'
import CoverImg from '../assets/images/coverpage.webp'
import Pizza from '../assets/images/pizza.webp'
import Burger from '../assets/images/burger.webp'
import Chicken from '../assets/images/chicken.webp'
import Noodles from '../assets/images/noodles.webp'
import Steak from '../assets/images/steak.webp'
import Spageti from '../assets/images/spageti.webp'
import FrenchFries from '../assets/images/french fries.webp'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React, { useState, useEffect, Suspense } from 'react';
import LoadingIcons from 'react-loading-icons';
import { Helmet } from 'react-helmet';
import CardCompt from '../component/CardCompt';


function Home() {
    //menyimpan data API
    const [dataBurger, setDataBurger] = useState({});
    //untuk route
    const navigate = useNavigate()
    useEffect(() => {
        const apiKey = '6f6127e0b5254c14ae13463569031c57';
        const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setDataBurger(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Panggil fungsi fetchData saat komponen dimuat
        return () => {
            console.log('Clean-up');
        };
    }, []);

    //variable image suggest recipe
    const imageRandom = {};
    if (dataBurger.recipes) {
        for (let i = 0; i < Math.min(dataBurger.recipes.length, 10); i++) {
            imageRandom[`imageRandom${i}`] = dataBurger.recipes[i].image;
        }
    }
    //variable title
    const title = {};
    if (dataBurger.recipes) {
        for (let i = 0; i < Math.min(dataBurger.recipes.length, 10); i++) {
            title[`title${i}`] = dataBurger.recipes[i].title;
        }
    }


    //variable params id passing to recipeDetail
    const id = {};
    if (dataBurger.recipes) {
        for (let i = 0; i < Math.min(dataBurger.recipes.length, 10); i++) {
            id[`id${i}`] = dataBurger.recipes[i].id;
        }
    }

    const titles = [title.title0, title.title1, title.title2, title.title3, title.title4, title.title5, title.title6, title.title7, title.title8, title.title9];
    const ids = [id.id0, id.id1, id.id2, id.id3, id.id4, id.id5, id.id6, id.id7, id.id8, id.id9];
    const images = [imageRandom.imageRandom0, imageRandom.imageRandom1, imageRandom.imageRandom2, imageRandom.imageRandom3, imageRandom.imageRandom4, imageRandom.imageRandom5, imageRandom.imageRandom6, imageRandom.imageRandom7, imageRandom.imageRandom8, imageRandom.imageRandom9];
    const maxLength = Math.max(titles.length, ids.length, images.length);

    const dataArray = Array.from({ length: maxLength }, (_, index) => ({
        title: titles[index] || '',
        id: ids[index] || '',
        image: images[index] || '',
    }));

    const [search, setSearch] = useState([])
    const [recipe, setRecipe] = useState('')
    useEffect(() => {
        const apiKeys = '6f6127e0b5254c14ae13463569031c57'
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&number=9&apiKey=${apiKeys}`
        let isMounted = true;
        const fetchData = async () => {
            axios.get(url).then((response) => {
                if (isMounted) {
                    setSearch(response.data)
                    console.log(response.data)
                }
            }).catch(error => {
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    console.log('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.log('No response received:', error.request);
                } else if (isMounted) {
                    console.log('isMounted')
                } else {
                    console.log('Error setting up the request:', error.message);
                }
            })
        }
        if (recipe.trim() !== '') {
            fetchData();
        } else {
            // Jika query kosong, reset hasil pencarian
            setSearch([]);
        }
        return () => {
            isMounted = false;
            console.log('Clean Up');
        };

    }, [recipe]);

    //titleLooping
    const titleLoop = {}
    if (search.results) {
        for (let i = 0; i < Math.min(search.results.length); i++) {
            titleLoop[`title${i}`] = search.results ? search.results[i].title : null;
        }
    }
    console.log(titleLoop)
    //looping id
    const idLoop = {}
    if (search.results) {
        for (let i = 0; i < Math.min(search.results.length); i++) {
            idLoop[`id${i}`] = search.results ? search.results[i].id : null;
        }
    }
    // console.log(search.results ? search.results[0].id : null)
    // console.log(idLoop)

    const titleArray = [];
    for (let i = 0; i < Math.min(search.results ? search.results.length : null); i++) {
        titleArray.push(titleLoop[`title${i}`]);
    }
    const totalResults = (search.totalResults)
    console.log('ini' + totalResults)
    return (
        <>
            <Helmet>
                <title>Secret Recipe Mr.Crabs</title>
            </Helmet>
            <NavbarCompt />
            <img className='coverImg' src={CoverImg} alt="" />
            <Container>
                <div className='row d-flex justify-content-center' id='wrapper-heading-form'>
                    <div className="col-7">
                        <h1 className='heading-cover'>Best Food For Your Mood</h1>
                        <input className="form-control form-search"
                            value={recipe}
                            onChange={(e) => setRecipe(e.target.value)}
                            type="text" placeholder="What are you cooking..." aria-label="default input example" />
                        {search.totalResults === 0 ? (
                            <ul className="list-group list-search">
                                <li className="list-group-item">Tak Adam air</li>
                            </ul>
                        ) : (
                            <ul className="list-group list-search">

                                {search.results && search.results.slice(0, 10).map((result, index) => (
                                    <li className="list-group-item"
                                        key={index}
                                        onClick={() => navigate(`/recipeDetail/${result.id}`)}>{result.title}</li>
                                ))}
                                {search.totalResults > 10 && (
                                    <li className="list-group-item" onClick={() => navigate(`/search/${recipe}`, { state: { dataA: totalResults } })}>
                                        See All
                                    </li>
                                )}

                            </ul>
                        )}






                    </div>
                </div>
                <div className="row wrapper-card-category">
                    <h2 className='category-recipe'>Categories</h2>
                    <div className='card-menus'>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            pagination={{ clickable: true }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}

                        >
                            <SwiperSlide className=''>

                                <div className="card m-2">
                                    <Suspense fallback={LoadingIcons}>
                                        <img src={Pizza} id='imageCategory' className="card-img-top" alt="..." />
                                    </Suspense>
                                    <div className="card-body">
                                        <h5 className="card-title category-title" >Pizza</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/pizza')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>

                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={Burger} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title" >Burger</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate(`/category/burger`)} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={Steak} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title">Steak</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/steak')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={Chicken} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title">Chicken</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/chicken')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={Spageti} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title">Spagetti</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/spagetti')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={FrenchFries} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title">French Fries</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/frechfries')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className=''>
                                <div className="card m-2" >
                                    <img src={Noodles} id='imageCategory' className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title category-title">Noodles</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a onClick={() => navigate('/category/noodles')} className="btn" id='btn-category'>Go somewhere</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
                <div className="wrapper-card-suggest">
                    <h2 className='suggest-recipe'>Suggest Recipe</h2>
                    <div className="container text-center">
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4">
                            {dataArray.map((dataItem, index) => (
                                <CardCompt key={index}
                                    navigate={() => navigate(`/recipeDetail/${dataItem.id}`)}
                                    image={dataItem.image}
                                    title={dataItem.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}

export default Home
