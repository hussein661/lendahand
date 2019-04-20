import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles/style.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const App = () => (
    <Routes />
);

ReactDOM.render(<MuiThemeProvider>
    <App />
    </MuiThemeProvider>, document.getElementById('root'));
