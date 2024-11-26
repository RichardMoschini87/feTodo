import './App.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ListaTodo } from './ListaTodo';
import { Aggiungitodo } from './AggiungiTodo';
import { textDecoration } from './css/global';

function App() {

  return (
    <>
      <Router>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand ms-4 ps-4">Accademia Digitale</a>

            <span className='text-light'> <Link style={textDecoration} to={'/add'}><span className='text-light'>Aggiungi todo</span></Link></span>

            <form className="d-flex">
              <input className="form-control me-4" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success btn-sm" type="submit">Ricerca</button>
            </form>

          </div>
        </nav>
        <Routes>
          <Route path="/" element={< ListaTodo />} />
          <Route path="/add" element={<Aggiungitodo />} />
        </Routes>
      </Router >
      <div className="footer" style={{ position: 'absolute', bottom: '0', left: '0', right: '0', zIndex: '10', backgroundColor: 'black' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <p className="text-light">Copyright © 2024 - TODO</p>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
