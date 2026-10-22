$(function () {
  var $header = $(".site-header");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scrollToTarget($target) {
    var top = $target.offset().top - $header.outerHeight();
    $("html, body").stop().animate({ scrollTop: top }, reduce ? 0 : 450);
  }

  $(".site-nav a, .brand, .hero .btn, .btn-pill, .bio-card a").on("click", function (event) {
    var href = $(this).attr("href");
    if (!href || href.charAt(0) !== "#") return;
    var $target = $(href);
    if (!$target.length) return;
    event.preventDefault();
    scrollToTarget($target);
    $(".site-nav").removeClass("open");
    $(".menu-btn").attr("aria-expanded", "false");
    if (history.replaceState) history.replaceState(null, "", href);
  });

  $(".menu-btn").on("click", function () {
    var open = $(".site-nav").toggleClass("open").hasClass("open");
    $(this).attr("aria-expanded", open ? "true" : "false");
  });

  $(".service-toggle").on("click", function () {
    var $service = $(this).closest(".service");
    var $panel = $service.find(".service-panel");
    var willOpen = !$service.hasClass("open");
    $(this).attr("aria-expanded", willOpen ? "true" : "false");
    if (willOpen) {
      $service.addClass("open");
      $panel.stop(true, true).slideDown(200);
    } else {
      $panel.stop(true, true).slideUp(200, function () {
        $service.removeClass("open");
      });
    }
  });

  var sectionIds = ["about", "services", "pricing", "book"];

  $(window).on("scroll", function () {
    var pos = $(window).scrollTop() + $header.outerHeight() + 24;
    var current = "";
    $.each(sectionIds, function (_, id) {
      var $section = $("#" + id);
      if ($section.length && $section.offset().top <= pos) current = id;
    });
    $(".site-nav a").removeClass("active");
    if (current) $('.site-nav a[href="#' + current + '"]').addClass("active");
  });
});
