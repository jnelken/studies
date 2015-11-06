$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
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

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
