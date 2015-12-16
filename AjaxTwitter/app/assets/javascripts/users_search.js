$.UsersSearch = function (el) {
this.$el = $(el);
this.$input = this.$el.find("#user_name");
this.$ul = this.$el.find("ul");
this.bindEvents();
};

$.UsersSearch.prototype.bindEvents = function () {
  this.$el.on("keyup", "input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (e) {
  var text = this.$input.val();
  $.ajax({
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: {
      "query": text
    },
    success: function(returned){
      this.renderResults(returned);
    }.bind(this)
  });
};

$.UsersSearch.prototype.renderResults = function (returned) {
  var users = returned;
  console.log(users);
  this.$ul.empty();

  for (var i = 0; i < users.length; i++) {
    $li = "<li>" + users[i].username + "</li>";
    this.$ul.append($li);
  }
};

$.fn.UsersSearch = function(){
  return this.each(function(){
    new $.UsersSearch(this);
  });
};

$(function (){
  $("div.users-search").UsersSearch();
});
