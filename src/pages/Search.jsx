import { useState, useEffect, Suspense } from "react";
import NavbarCompt from "../component/NavbarCompt";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import CoverImg from '../assets/images/coverpage.webp'
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import CardCompt from "../component/CardCompt";
function Search() {
    const navigate = useNavigate()
    const searchText = useParams()
    const location = useLocation();
    const { dataA } = location.state || {}
    console.log(dataA)
    console.log(searchText)

    const [data, setData] = useState({})
    useEffect(() => {
        const totalResults = (data.totalResults)
        console.log(totalResults)
        const apiKeys = '6f6127e0b5254c14ae13463569031c57'
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchText.param}&number=${dataA}&apiKey=${apiKeys}`
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching data:', error);
                if (error.response.status == '404') {
                    Swal.fire({
                        title: "hey?",
                        text: "Jika ingin melakukan pencarian dihalaman awal, bukan di link!!! asw",
                        showDenyButton: true,
                        showConfirmButton: false,
                        denyButtonText: `Iya kak maaf..`
                    })
                }
            }
        };

        fetchData(); // Panggil fungsi fetchData saat komponen dimuat
        return () => {
            console.log('Clean-up');
        };
    }, []);


    //looping title
    const titleSearch = [];
    if (data.results) {
        for (let i = 0; i < Math.min(data.results.length); i++) {
            titleSearch[`title${i}`] = data.results[i].title;
        }
    }
    console.log(titleSearch)
    //looping image
    const imageSearch = [];
    if (data.results) {
        for (let i = 0; i < Math.min(data.results.length); i++) {
            imageSearch[`image${i}`] = data.results[i].image;
        }
    }
    console.log(imageSearch)
    //looping id
    const idSearch = [];
    if (data.results) {
        for (let i = 0; i < Math.min(data.results.length); i++) {
            idSearch[`id${i}`] = data.results[i].id;
        }
    }
    console.log(idSearch)

    //looping title for showing
    const titles = [];
    for (let i = 0; i < Math.min(data.results ? data.results.length : null); i++) {
        titles.push(titleSearch[`title${i}`]);
    }
    console.log(titles)
    //looping image for showing
    const images = [];
    for (let i = 0; i < Math.min(data.results ? data.results.length : null); i++) {
        images.push(imageSearch[`image${i}`]);
    }
    console.log(images)
    //looping id for showing
    const ids = [];
    for (let i = 0; i < Math.min(data.results ? data.results.length : null); i++) {
        ids.push(idSearch[`id${i}`]);
    }
    console.log(ids)
    const maxLength = Math.max(titles.length, ids.length, images.length);

    const dataArray = Array.from({ length: maxLength }, (_, index) => ({
        title: titles[index] || '',
        id: ids[index] || '',
        image: images[index] || '',
    }));
    const sweetAllert = <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    return (
        <>
            {sweetAllert}
            <Helmet>
                <title>Search {searchText.param}</title>
            </Helmet>
            <NavbarCompt />
            <img className='coverImg' src={CoverImg} alt="" />
            <Container>
                <div className="wrapper-card-suggest">
                    <h2 className='suggest-recipe'>Search {searchText.param}</h2>
                    <div className="container text-center">
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4">
                            {dataArray.map((dataItem, index) => (

                                <CardCompt
                                    key={index}
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
export default Search;