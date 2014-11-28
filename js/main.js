$(function() {
  window.sr = new scrollReveal();
  if($(".background").length > 0) {
    $(window).scroll(function() {
      if ($(window).scrollTop() > $(window).height()-200) {
        $(".background").addClass("fade-out");
        $(".background-bottom").addClass("fade-out");
      }
      else if ($(window).scrollTop() > ($(window).height()-400)) {
        $(".background").addClass("fade");
        $(".background").removeClass("fade-out");

        $(".background-bottom").addClass("fade");
        $(".background-bottom").removeClass("fade-out");
      }
      else if ($(window).scrollTop() < ($(window).height()-400)) {
        $(".background").removeClass("fade");
        $(".background-bottom").removeClass("fade");
      }
    });
  }
});
