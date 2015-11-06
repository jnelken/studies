$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.bindEvents();
};

$.FollowToggle.prototype.render = function () {
  var buttonText = "";
  if (this.followState == "unfollowed") {
    buttonText = "Follow!";
  }else{
    buttonText = "Unfollow!";
  }
  this.$el.text(buttonText);
};

$.FollowToggle.prototype.bindEvents = function(){
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.handleClick = function (e) {
  // debugger
  e.preventDefault();
  var method = "";
  var path = "/users/" + this.userId + "/follow";
  if (this.followState === "followed") {
    method = "DELETE";
  } else {
    method = "POST";
  }

  $.ajax({
    url: path,
    type: method,
    dataType: "json",
    data: {
      "user_id": this.user_id
    },
    success: function (data) {
      this.followState = (this.followState === "followed") ? "unfollowed" : "followed";
      this.$el.data("initial-follow-state", this.followState);
      this.render();
    }.bind(this)
  });
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
