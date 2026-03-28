import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import Home from './components/Home';
import Filter from './components/Filter';
import { StateContext } from './context/stateContext';
import './style/footer.css';

import './App.css';

function App() {
  return (
    <StateContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:type/:searchValue" element={<Filter />} />
          <Route path="/:searchType/:ID/:name" element={<Details />} />
          <Route path="/:searchType/:ID" element={<Details />} />
        </Routes>
        <footer>
          <div className="footer">
            <div className="footer-politics">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookie Policy</p>
            </div>
            <p>© 2024 Coding Bootcamp</p>
            <div className="footer-social">
              <a href="#">
                <FaFacebook className="footer-icons" />
              </a>
              <a href="#">
                <FaTwitter className="footer-icons" />
              </a>
              <a href="#">
               <FaInstagram className="footer-icons" />
              </a>
            </div>
          </div>
        </footer>
    </StateContext>
  );
}

export default App
