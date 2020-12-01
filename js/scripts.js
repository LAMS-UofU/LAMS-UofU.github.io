(function ($) {
  // Remove no-js class
  $("html").removeClass("no-js");

  // Animate to section when nav is clicked
  $("header a").click(function (e) {
    // Treat as normal link if no-scroll class
    if ($(this).hasClass("no-scroll")) return;

    e.preventDefault();
    var heading = $(this).attr("href");
    var scrollDistance = $(heading).offset().top;

    $("html, body").animate(
      {
        scrollTop: scrollDistance + "px",
      },
      Math.abs(window.pageYOffset - $(heading).offset().top) / 1
    );

    // Hide the menu once clicked if mobile
    if ($("header").hasClass("active")) {
      $("header, body").removeClass("active");
    }
  });
  document.getElementById("year").innerHTML = new Date().getFullYear();

  // Scroll to top
  $("#to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  // Scroll to first element
  $("#lead-down span").click(function () {
    var scrollDistance = $("#lead").next().offset().top;
    $("html, body").animate(
      {
        scrollTop: scrollDistance + "px",
      },
      500
    );
  });

  // Create timeline
  $("#experience-timeline").each(function () {
    $this = $(this); // Store reference to this
    $userContent = $this.children("div"); // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this)
        .addClass("vtimeline-content")
        .wrap(
          '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>'
        );
    });

    // Add icons to each block
    $this.find(".vtimeline-point").each(function () {
      $(this).prepend(
        '<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>'
      );
    });

    // Add dates to the timeline if exists
    $this.find(".vtimeline-content").each(function () {
      var date = $(this).data("date");
      if (date) {
        // Prepend if exists
        $(this)
          .parent()
          .prepend('<span class="vtimeline-date">' + date + "</span>");
      }
    });
  });

  // Open mobile menu
  $("#mobile-menu-open").click(function () {
    $("header, body").addClass("active");
  });

  // Close mobile menu
  $("#mobile-menu-close").click(function () {
    $("header, body").removeClass("active");
  });

  // Load additional projects
  $("#view-more-projects").click(function (e) {
    e.preventDefault();
    $(this).fadeOut(300, function () {
      $("#more-projects").fadeIn(300);
    });
  });
});

document.getElementById("year").innerHTML = new Date().getFullYear();

// highlight navigation links

// cache the navigation links
var $navigationLinks = $("header > ul > li > a");
// cache (in reversed order) the sections
var $sections = $($(".section").get().reverse());

// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {};
$sections.each(function () {
  var id = $(this).attr("id");
  sectionIdTonavigationLink[id] = $("header > ul > li > a[href=\\#" + id + "]");
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
  var lastCall, timeoutId;
  return function () {
    var now = new Date().getTime();
    if (lastCall && now < lastCall + interval) {
      // if we are inside the interval we wait
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        lastCall = now;
        fn.call();
      }, interval - (now - lastCall));
    } else {
      // otherwise, we directly call the function
      lastCall = now;
      fn.call();
    }
  };
}

function highlightNavigation() {
  // get the current vertical position of the scroll bar
  var scrollPosition = $(window).scrollTop();

  // iterate the sections
  $sections.each(function () {
    var currentSection = $(this);
    // get the position of the section
    var sectionTop = currentSection.offset().top;

    // if the user has scrolled over the top of the section
    if (scrollPosition >= sectionTop) {
      // get the section id
      var id = currentSection.attr("id");
      // get the corresponding navigation link
      var $navigationLink = sectionIdTonavigationLink[id];
      // if the link is not active
      if (!$navigationLink.hasClass("active")) {
        // remove .active class from all the links
        $navigationLinks.removeClass("active");
        // add .active class to the current link
        $navigationLink.addClass("active");
      }
      // we have found our section, so we return false to exit the each loop
      return false;
    }
  });
}

$(window).scroll(throttle(highlightNavigation, 100));

// if you don't want to throttle the function use this instead:
// $(window).scroll( highlightNavigation );
