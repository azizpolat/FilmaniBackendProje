import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './pages/Main'
import Create from './pages/Create'
import Details from './pages/Details'
import Header from './components/Header' 

const App = () => {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/movie/:id' element={<Details />} />
      <Route path='/create' element={<Create />}/>
  </Routes>
  </BrowserRouter>
    
)
}

export default App
