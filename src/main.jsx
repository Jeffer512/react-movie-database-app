import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
console.log(import.meta.env.BASE_URL);
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/react-movie-database-app" >
    <App />
  </BrowserRouter>,
)

