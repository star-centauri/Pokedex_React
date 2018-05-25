var PokeApi = {
    get url() {
        return '//pokeapi.co/api/v2/';
    },
    pkmList: [],
    limit: '?limit=100',
    listAll: function () {
        return fetch(`${this.url}pokemon/${this.limit}`)
            .then(response => response.json())
            .then(response => response.results)
            .then(pkmList => {
                return pkmList.map(pokemon => {
                    pokemon.number = this.getNumberFromURL(pokemon.url);
                    return pokemon;
                }).sort((a, b) => (a.number > b.number ? 1 : -1))
                    .map(pokemon => {
                        pokemon.number = ('000' + pokemon.number).slice(-3);
                        return pokemon;
                    })
            })
            .then(pkmList => {
                this.pkmList = pkmList;
                return pkmList;
            })
    },
    getNumberFromURL: function (url) {
        return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
    },
    getPkm: function (pkm) {
        return fetch(`${this.url}pokemon/${pkm.number}`)
            .then(response => response.json());
    }
};

export default PokeApi;