import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeContainer from './containers/home/home';
import './App.css';


/* 
 * a container should manage and manipulate the state
 * a state is the current condition of something at a point in time
 * stateful components are called containers because they have access to state and lifecycle hooks
 */
function App() {
    /* 
     * wrap the part of your app that needs routing features in BrowserRouter
     * you can also configure BrowserRouter in index.html
     * <Route path="/" exact render={() => <h1>Home</h1>}/>
     */
    return (
        <Router>
            <div>
                <Route path="/" exact component={HomeContainer}/>
            </div>
        </Router>
    );
}

export default App;
