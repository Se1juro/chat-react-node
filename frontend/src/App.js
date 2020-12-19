import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Components/Routes";
import {UserProvider} from "./context/UserProvider";
export default () => (
    <UserProvider>
        <App />
    </UserProvider>
);
function App() {

    return (
        <div className="App">
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}
