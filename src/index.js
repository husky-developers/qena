// import { ChakraProvider } from '@chakra-ui/react';
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { HashRouter as Router } from 'react-router-dom';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Router>
//     <React.StrictMode>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </React.StrictMode>
//   </Router>
  
// );

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
