$(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > ($(window).height()-300)) {
      $(".background").addClass("fade");
    }
    else {
      $(".background").removeClass("fade");
    }
  });
});
