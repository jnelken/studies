$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var pokedex = document.getElementById('pokedex');
  React.render(
      <Router>
        <Route path ="/" component={ Index } >
          <Route path="pokemon/:pokemonid" component={PokemonDetail} />
        </Route>
      </Router>,
    pokedex);
});
