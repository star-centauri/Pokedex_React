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
                    pokemon.number = this.getNumberFromURL(pokemon.resource_url);
                    return pokemon;
                }).filter(pokemon => parseInt(pokemon.number) < 1000)
                    .sort((a, b) => (a.number > b.number ? 1 : -1))
                    .map(pokemon => {
                        pokemon.number = ('000' + pokemon.number).slice(-3);
                        return;
                    })
            })
            .then(pkmList => {
                this.pkmList = pkmList;
                return pkmList;
            })
    },
    getNumberFromURL: function (url) {
        //console.log(url);
        return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
    }
};

export default PokeApi;