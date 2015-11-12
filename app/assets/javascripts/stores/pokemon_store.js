(function(){

  var _pokemons = [];
  var POKEMONS_INDEX_CHANGE_EVENT = "change";
  var POKEMON_DETAIL_CHANGE_EVENT = "change2";

  var PokemonStore = window.PokemonStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _pokemons.slice(0);
    },

    find: function(id) {
      for (var i = 0; i < _pokemons.length; i++) {
        if (_pokemons[i].id === id) {
          return _pokemons[i];
        }
      }
      return {};
    },

    addPokemonsIndexChangeListener: function(callback) {
      this.on(POKEMONS_INDEX_CHANGE_EVENT, callback);
    },

    removePokemonsIndexChangeListener: function(callback){
      this.removeListener(POKEMONS_INDEX_CHANGE_EVENT, callback);
    },

    changed: function(){
      this.emit(POKEMONS_INDEX_CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch(payload.actionType){
        case PokemonConstants.POKEMONS_RECEIVED:
          _resetPokemons(payload.pokemons);
          break;
        case PokemonConstants.SINGLE_POKEMON_RECEIVED:
          _resetPokemonDetails(payload.pokemon);
          break;
      }
    }),

    addPokemonDetailsChangeListener: function (callback) {
      this.on(POKEMON_DETAIL_CHANGE_EVENT, callback);
    },

    removePokemonDetailsChangeListener: function(callback) {
      this.removeListener(POKEMON_DETAIL_CHANGE_EVENT, callback);
    },

    detailsChanged: function () {
      this.emit(POKEMON_DETAIL_CHANGE_EVENT);
    },

  });


  var _resetPokemons = function (data) {
    _pokemons = data;
    PokemonStore.changed();
  };

  var _resetPokemonDetails = function (data) {
    for (var i = 0; i < _pokemons.length; i++ ){
      if (_pokemons[i].id === data.id) {
        _pokemons[i] = data;
      }
    }
    PokemonStore.detailsChanged();
  };

})();
