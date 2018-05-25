import React, {Component} from 'react';

import PokeApi from '../Services/PokeApi';
import PokeListItem from './pokeListItem';

export  default  class PokeList extends  Component {
    static defaultProps = {
        filter: ''
    };

    state = {
        pkmList: []
    };

    componentWillMount() {
        if (!PokeApi.pkmList.length) {
            PokeApi.listAll().then(pkmList => {
                this.setState({pkmList});
            })
        } else {
            this.setState({pkmList: PokeApi.pkmList});
        }
    };

    render() {
        var state = this.state,
            props = this.props;

        return(
          <ul className="poke-list" id="pokeList">
                {
                    state.pkmList
                        .filter(pkm => pkm.name.indexOf(props.filter) !== -1)
                      .map(pkm => <PokeListItem pkm={pkm} key={pkm.number}/>)
              }
          </ul>
        );
    }
}