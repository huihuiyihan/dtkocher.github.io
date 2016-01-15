$(function() {
  if($(".background").length > 0) {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var fade=$(window).height()*0.65;
      var fadeout=$(window).height()*0.85;

      if(scroll > fadeout) {
        $(".background").addClass("fade-out");
        $(".background-bottom").addClass("fade-out");
      }
      else if(scroll > fade) {
        $(".background").addClass("fade");
        $(".background").removeClass("fade-out");

        $(".background-bottom").addClass("fade");
        $(".background-bottom").removeClass("fade-out");
      }
      else if(scroll < fade) {
        $(".background").removeClass("fade");
        $(".background").removeClass("fade-out");
        $(".background-bottom").removeClass("fade");
        $(".background-bottom").removeClass("fade-out");
      }
    });
  }
});
