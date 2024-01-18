// RecipeDetail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoverImg from '../assets/images/coverpage.webp'
import NavbarCompt from '../component/NavbarCompt';
import Container from 'react-bootstrap/Container';
import Pizza from '../assets/images/pizza.webp'
import '../assets/css/recipeDetail.css'
import { useParams } from 'react-router-dom';
// import { Hearts } from 'react-loading-icons';
import { Hearts, Puff, Rings, TailSpin, Grid, BallTriangle, Bars } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function RecipeDetail() {

  const idPassing = useParams()
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const apiKey = '6f6127e0b5254c14ae13463569031c57';
    const url = `https://api.spoonacular.com/recipes/${idPassing.id}/information?apiKey=${apiKey}&includeNutrition=true.`
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(url);
        setRecipe(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    console.log(idPassing.id)
    fetchRecipe();
  }, []);

  if (!recipe) {
    return <div className='d-flex justify-content-center'>
      <BallTriangle
        height="290"
        width="290"
        color='#bdb1e0'
      />
    </div>;
  }
  const title = (recipe.title)
  const thumbnail = (recipe.image)
  const instruction = (recipe.instructions)
  console.log(instruction)

  console.log(recipe)
  // const id = {};
  //   if (dataBurger.recipes) {
  //       for (let i = 0; i < Math.min(dataBurger.recipes.length, 10); i++) {
  //           id[`id${i}`] = dataBurger.recipes[i].id;
  //       }
  //   }

  const ingredients = {}
  if (recipe.extendedIngredients) {
    for (let i = 0; i < Math.min(recipe.extendedIngredients.length); i++) {
      ingredients[`ingredients${i}`] = recipe.extendedIngredients ? recipe.extendedIngredients[i].original : null;
    }
  }
  // const ingredients = (recipe.extendedIngredients ? recipe.extendedIngredients[0].original : null)
  // console.log(ingredients)


  const RecipeInstructions = ({ instructions }) => {
    return (
      <div>
        <h3>Instructions:</h3>
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>Recipe {title}</title>
      </Helmet>
      <NavbarCompt />
      <img className='coverImg' src={CoverImg} alt="" />
      <Container>
        <div className="row" id='wrapper-thumb'>
          <div className="col">
            <div className="card" id='thumb-recipe'>
              <img src={thumbnail} className="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col wrapper-text">
            <h1 className='text-thumb'>{title}</h1>
            <h2>Ingredients: </h2>
            <ul>
              {Object.keys(ingredients).map((key) => (
                <li key={key}>
                  {ingredients[key]}
                </li>
              ))}
            </ul>

            <RecipeInstructions
              instructions={recipe.instructions}
            />

          </div>
        </div>



      </Container>

    </>
  );
}

export default RecipeDetail;
