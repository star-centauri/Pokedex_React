import React, {Component} from 'react';
import  {Link} from 'react-router-dom';

export default class PokeInfo extends Component {
    state = {
        pkm: {info: {types:[]}}
    };

    componentWillMount() {
        this.getPkm();
    }

    getPkm() {
        let pkm = {
            name: 'Pikachu',
            number: '025',
            info: {
                types: [{name: 'electric'}],
                attack: 100,
                defense: 100,
                sp_atk: 100,
                sp_def: 100,
                speed: 100
            }
        };

        this.setState({pkm});
    }

    render() {
        let state = this.state,
            pkm = state.pkm;

        return(
          <div>
              <Link to="/" className="back-button"> &lt; </Link>

              <div className="poke-profile">
                  <div>#{pkm.number} - {pkm.name}</div>
                  <img className="poke-sprite" src={`//serebii.net/sunmoon/pokemon/${pkm.number}.png"`} />
              </div>

              <ul className="poke-types" id="pokeList">
                  {
                      pkm.info.types.map(type =>{
                          return(
                            <li key={type.name}>
                                <img src={`//serebii.net/pokedex-bw/type/${type.name}.gif`}/>
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