import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import api from './api/axios';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Exemplo de uso do Axios
api.get('/example-endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
