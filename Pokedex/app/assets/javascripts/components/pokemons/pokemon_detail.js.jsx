var PokemonDetail = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var pokemon_id = parseInt(this.props.params.pokemonid);
    return {pokemon: PokemonStore.find(pokemon_id)};
  },

  componentDidMount: function(){
    PokemonStore.addPokemonDetailsChangeListener(this._onDetailsChange);
    ApiUtil.fetchSinglePokemon(parseInt(this.props.params.pokemonid));
  },

  componentWillUnmount: function(){
    PokemonStore.removePokemonDetailsChangeListener(this._onDetailsChange);
  },

  _onDetailsChange: function(){
    this.setState(this.getStateFromStore());
  },

  componentWillReceiveProps: function (new_props) {
    var pokemon_id = parseInt(new_props.params.pokemonid);
    ApiUtil.fetchSinglePokemon(pokemon_id);
  },

  render: function () {
    var content;
    if (this.state.pokemon) {
      content =
        <div>
          <img src={this.state.pokemon.image_url} />
          <ul>
            <li>Name: {this.state.pokemon.name}</li>
            <li>Type: {this.state.pokemon.poke_type}</li>
            <li>Attack: {this.state.pokemon.attack}</li>
            <li>Defense: {this.state.pokemon.defense}</li>
            <li>Moves: {this.state.pokemon.moves}</li>
          </ul>
        </div>;
    } else {
      content = <div></div>;
    }

    return (
      <div className="detail">
        {content}
      </div>
    );
  }


});
