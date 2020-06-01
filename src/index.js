import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from '../src/components/Homepage/Homepage';

ReactDOM.hydrate(
  <Homepage />,
  document.getElementById('root')
);

