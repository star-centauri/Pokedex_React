import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import PokeList from './Components/PokeList';
import PokeInfo from './Components/PokeInfo';

class App extends Component {
    state = {
        filter: ''
    };

    setFilter(event) {
        this.setState({filter: event.target.value});
    }

    componentDidMount() {
        let pokeball = document.getElementById('pokeballBack');

        window.onscroll = function () {
            let rotation = `translateY(-50%) rotateZ(${window.scrollY / 15}deg)`;
            pokeball.style.transform = rotation;
        }
    }

    render() {
        let state = this.state;
        return (
            <div className="App">
                <img className="pokeball-back" id="pokeballBack" src="//hanashiro.github.io/pokedex/images/pokeball.svg" />
                <Route exact path="/" render={() => <input type="text" id="poke-filter" placeholder="Search" onKeyUp={this.setFilter.bind(this)} /> }/>
                <Route exact path="/" render={() => <PokeList filter={state.filter}/> }/>
                <Route exact path="/:pokeNumber" component={PokeInfo}/>
            </div>
        );
    }
}

export default App;
