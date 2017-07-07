import React from 'react';
import { render }from 'react-dom';
declare namespace JSX {
   interface IntrinsicElements {
       [elemName: string]: any;
   }
}
import * as App from './App.tsx';
render(<App/>,document.getElementById('app'));