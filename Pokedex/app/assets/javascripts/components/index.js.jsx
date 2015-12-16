var Index = React.createClass({
  render: function(){
            // debugger
    return (
      <div>
        <div className="pokemon-index">
          <PokemonsIndex />
        </div>
        {this.props.children}
      </div>
    );
  }
});
