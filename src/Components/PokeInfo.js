import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeApi from '../Services/PokeApi';

export default class PokeInfo extends Component {
    state = {
        pkm: {info: {types:[]}}
    };

    componentWillMount() {
        this.getPkm();
    }

    getPkm() {
        if (PokeApi.pkmList.length) {
            this.setPkm(PokeApi.pkmList);
        } else {
            PokeApi.listAll().then(this.setPkm.bind(this));
        }
    }

    setPkm(pkmList) {
        let pkm = pkmList.find(pkm => pkm.number === this.props.match.params.pokeNumber),
            that = this;

        if (pkm) {
            PokeApi.getPkm(pkm)
                .then((info) => {
                    pkm.info = info;
                    this.setState({pkm});
                });
        }
    }

    render() {
        let state = this.state,
            pkm = state.pkm;

        if (pkm.info.types.length !== 0) {
            return (
                <div>
                    <Link to="/" className="back-button"> &lt; </Link>

                    <div className="poke-profile">
                        <div>{pkm.number} - {pkm.name.toUpperCase()}</div>
                        <img className="poke-sprite" src={`//serebii.net/sunmoon/pokemon/${pkm.number}.png`} />
                    </div>

                    <ul className="poke-types" id="pokeList">
                        {
                            pkm.info.types.map(type => {
                                return (
                                    <li key={type.type.name}>
                                        <img src={`//serebii.net/pokedex-bw/type/${type.type.name}.gif`} />
                                    </li>
                                );
                            })
                        }
                    </ul>

                    <table className="stats">
                        <tbody>
                            <tr> 
                                {
                                    pkm.info.stats.map(stat => {
                                        return (
                                            <td key={stat.stat.name}>{stat.stat.name}</td>
                                        );
                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    pkm.info.stats.map(stat => {
                                        return (
                                            <td key={stat.stat.name}>{stat.base_stat}</td>
                                        );
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return "So um momento que esta carregando..."
        }

    }
}