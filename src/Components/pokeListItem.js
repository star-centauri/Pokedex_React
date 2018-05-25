import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class PokeListItem extends  Component {
    static defaultProps = {
        pkm: {}
    };

    render() {
        let props = this.props,
            pkm = props.pkm;

        { document.getElementById("poke-filter").style.display = 'display' }

        return (
            <li className="poke-list-item">
              <Link to={`/${pkm.number}`}>
                <img src={`//serebii.net/pokedex-xy/icon/${pkm.number}.png`}/>
                <span>{pkm.number} - {pkm.name}</span>
              </Link>
          </li>
        );
    }
}