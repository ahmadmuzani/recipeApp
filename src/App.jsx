import NavbarCompt from './component/NavbarCompt'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx';
import Category from './pages/Category.jsx';
import Search from './pages/Search.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const linkCSS = <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />;
  return (
    <>
      {linkCSS}
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/recipeDetail/:id' element={<RecipeDetail />}></Route>
          <Route path='/category/:param' element={<Category />}></Route>
          <Route path='/search/:param' element={<Search />}></Route>
        </Routes>
      </Router>


    </>
  )
}

export default App
