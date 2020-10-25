import React from 'react';
import './App.css';

import Header from './components/Header'
import Films from './components/webPages/Films'
import Series from './components/webPages/Series'
import Child from './components/webPages/Child'
import Broadcast from './components/webPages/Broadcast'
import {Route, Redirect} from 'react-router-dom';

import {Container} from 'react-bootstrap'




function App() {
    return (
        <div className="App">
            <Header/>
            <Container>
                <Redirect to="/filmler"  />
                <Route exact path='/filmler' component={Films}></Route>
                <Route exact path='/diziler' component={Series}></Route>
                <Route exact path='/cocuk' component={Child}></Route>
                <Route exact path='/canli-yayin' component={Broadcast}></Route>
            </Container>
        </div>
    );
}

export default App;
