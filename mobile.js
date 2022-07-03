let firstColor = $(".trigger-color").eq(0).css("background-color");
$(".sticky-section").css("background-color", firstColor);

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

let imageTotal = $(".scroll-img").length - 1;

$(".trigger:nth-child(odd)").each(function (index) {
  let triggerElement = $(this);
  let myIndex = imageTotal - triggerElement.index();
  let myImage = $(".scroll-img").eq(myIndex);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      // can also use "20px 80%"
      start: "top top",
      end: "bottom top",
      onLeave: () =>
        $(".sticky-section").css("background-color", "transparent"),
      scrub: 1
    }
  });
  tl.to(myImage, {
    x: "-1em",
    y: "-3em",
    rotation: -10,
    opacity: 1,
    duration: 1,
    scaleX: 1,
    scaleY: 1
  });
  tl.to(myImage, {
    x: "-20em",
    y: "-24em",
    rotation: -20,
    opacity: 0,
    duration: 0.3
  });
});

// Even Images
$(".trigger:nth-child(even)").each(function (index) {
  let triggerElement = $(this);
  let myIndex = imageTotal - triggerElement.index();
  let myImage = $(".scroll-img").eq(myIndex);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      // can also use "20px 80%"
      start: "top top",
      end: "bottom top",
      onLeave: () => $(".sticky-section").css("background-color", "white"),
      scrub: 1
    }
  });
  tl.to(myImage, {
    x: "1em",
    y: "-3em",
    rotation: 10,
    opacity: 1,
    duration: 1,
    scaleX: 1,
    scaleY: 1
  });
  tl.to(myImage, {
    x: "20em",
    y: "-24em",
    rotation: 20,
    opacity: 0,
    duration: 0.3
  });
});

// Next Image
$(".trigger").each(function (index) {
  let triggerElement = $(this);
  let myIndex = imageTotal - triggerElement.index();
  let myImage = $(".scroll-img").eq(myIndex - 1);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      // can also use "20px 80%"
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });
  tl.from(myImage, {
    scaleX: 0.9,
    scaleY: 0.9,
    duration: 1
  });
});

// Text & Background
$(".trigger").each(function (index) {
  let triggerElement = $(this);
  let myIndex = imageTotal - triggerElement.index();
  let myText = $(".scroll-text").eq(myIndex);
  let myItem = $(".scroll-item").eq(myIndex);
  let myColor = $(this).find(".trigger-color").css("background-color");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      // can also use "20px 80%"
      start: "top top",
      end: "bottom 30%",
      toggleClass: { targets: myItem, className: "active" },
      onEnter: () => $(".sticky-section").css("background-color", myColor),
      onEnterBack: () => $(".sticky-section").css("background-color", myColor),
      scrub: 1
    }
  });
  tl.to(myText, {
    y: "-0.15em",
    opacity: 1,
    duration: 1
  });
  tl.to(myText, {
    opacity: 0,
    duration: 0.3
  });
});
