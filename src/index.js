// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { ThemeProvider } from './context/ThemeContext';
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(

//   <React.StrictMode>
//     <BrowserRouter>
//        <ThemeProvider >
//           <App />
//        </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>

// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';



ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
     <ThemeProvider >
        <App />
     </ThemeProvider>
  </BrowserRouter>
</React.StrictMode>
,
  document.getElementById('root')
);