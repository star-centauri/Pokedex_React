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
                    that.setState({pkm});
                });
        }
    }

    render() {
        let state = this.state,
            pkm = state.pkm;

        { document.getElementById("poke-filter").style.display = 'none' }

        return(
            <div>
              <Link to="/" className="back-button"> &lt; </Link>

              <div className="poke-profile">
                  <div>#{pkm.number} - {pkm.name}</div>
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
                        <td>Attack</td>
                        <td>Defense</td>
                        <td>Sp Atk</td>
                        <td>Sp Def</td>
                        <td>Speed</td>
                    </tr>
                    <tr>
                      <td>{pkm.info.attack}</td>
                      <td>{pkm.info.defense}</td>
                      <td>{pkm.info.sp_atk}</td>
                      <td>{pkm.info.sp_def}</td>
                      <td>{pkm.info.speed}</td>
                  </tr>
                  </tbody>
              </table>
          </div>
        );
    }
}