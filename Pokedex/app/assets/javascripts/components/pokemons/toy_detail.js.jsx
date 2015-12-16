var ToyDetail = React.createClass({
  render: function(){
    var content = "";
    if (this.state.pokemon){
      content = this.state.pokemon.toys;
    }

    return(
      <div>
        {content}
      </div>
    );
  }
});
