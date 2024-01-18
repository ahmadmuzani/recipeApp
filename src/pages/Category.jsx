import NavbarCompt from "../component/NavbarCompt"
import { useParams } from "react-router-dom";
import CoverImg from '../assets/images/coverpage.webp'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Suspense } from 'react';
import axios from "axios";
import { Hearts, Puff, Rings, TailSpin, Grid, BallTriangle, Bars } from 'react-loader-spinner';
import { Helmet } from "react-helmet";
import CardCompt from "../component/CardCompt";

function Category() {
    const param = useParams()
    console.log(param)
    const [dataCategory, setDataCategory] = useState({});

    const navigate = useNavigate()
    useEffect(() => {
        const apiKey = '6f6127e0b5254c14ae13463569031c57';
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${param.param}&number=99&apiKey=${apiKey}`;
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setDataCategory(response.data);
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

    const imageCategory = [];
    if (dataCategory.results) {
        for (let i = 0; i < Math.min(dataCategory.results.length); i++) {
            imageCategory[`image${i}`] = dataCategory.results[i].image;
        }
    }
    console.log(imageCategory)



    const titleCategory = [];
    if (dataCategory.results) {
        for (let i = 0; i < Math.min(dataCategory.results.length); i++) {
            titleCategory[`title${i}`] = dataCategory.results[i].title;
        }
    }

    console.log(titleCategory)
    const idCategory = [];
    if (dataCategory.results) {
        for (let i = 0; i < Math.min(dataCategory.results.length); i++) {
            idCategory[`id${i}`] = dataCategory.results[i].id;
        }
    }
    console.log(idCategory)

    const titles = [];
    for (let i = 0; i < Math.min(dataCategory.results ? dataCategory.results.length : null); i++) {
        titles.push(titleCategory[`title${i}`]);
    }
    console.log(titles)

    const ids = [];
    for (let i = 0; i < Math.min(dataCategory.results ? dataCategory.results.length : null); i++) {
        ids.push(idCategory[`id${i}`]);
    }
    console.log(ids)

    const images = [];
    for (let i = 0; i < Math.min(dataCategory.results ? dataCategory.results.length : null); i++) {
        images.push(imageCategory[`image${i}`]);
    }
    console.log(images)
    console.log(dataCategory)


    const maxLength = Math.max(titles.length, ids.length, images.length);

    const dataArray = Array.from({ length: maxLength }, (_, index) => ({
        title: titles[index] || '',
        id: ids[index] || '',
        image: images[index] || '',
    }));
    if (!dataCategory.results) {
        return <div className='d-flex justify-content-center'>
            <BallTriangle
                height="290"
                width="290"
                color='#bdb1e0'
            />
        </div>;
    }

    return (
        <>
            <Helmet>
                <title>Category {param.param}</title>
            </Helmet>
            <NavbarCompt />
            <img className='coverImg' src={CoverImg} alt="" />
            <Container>
                <div className="wrapper-card-suggest">
                    <h2 className='suggest-recipe'>Category {param.param}</h2>
                    <div className="container text-center">
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4">
                            {dataArray.map((dataItem, index) => (
                                <CardCompt key={index}
                                    navigate={() => navigate(`/recipeDetail/${dataItem.id}`)}
                                    image={dataItem.image}
                                    title={dataItem.title}
                                />

                                // <div className="col" key={index}>
                                //     <div className="card m-2 " onClick={() => navigate(`/recipeDetail/${dataItem.id}`)}>
                                //         <Suspense>
                                //             <img src={dataItem.image} id='imageCategory' className="card-img-top" alt="..." />
                                //         </Suspense>
                                //         <div className="card-body">
                                //             <h5 className="card-title suggest-title">{dataItem.title}</h5>
                                //         </div>
                                //     </div>
                                // </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
export default Category