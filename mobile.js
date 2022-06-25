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
    // x: "20em",
    // y: "-24em",
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



$("canvas").each(function (index) {
 
  let idName = `chart1${index}`;

  $(this).attr("id", idName);
  // Get the parent collection item
  let cmsItem = $(this).closest(".scroll-item");
  // Find content of .perdictionaccuracy paragraph text inside item
  let right = +cmsItem.find(".perdictionaccuracy").text();
  // Find content of .noaccuracy paragraph text inside item
  let wrong = +cmsItem.find(".noaccuracy").text();
  // Create charts
console.log(right)
console.log(wrong)

const data = [right];
const backgroundcolor = [];

for(i = 0; i < data.length; i ++) {
	if(data[i] < 30) { backgroundcolor.push('red')}
	if(data[i] >= 30 && data[i] < 60) { backgroundcolor.push('gold')}
	if(data[i] >= 60) { backgroundcolor.push('green')}
 }
 
 console.log(backgroundcolor);
 
 var ctx = document.getElementById(idName).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [right, wrong],
          backgroundColor: backgroundcolor,
        }
        ]
			}
  });
});
// Loop through every canvas on the page
$("canvas1").each(function (index) {
  // Set id name
  let idName = `chart2${index}`;
  // Give each canvas a unique id
  $(this).attr("id", idName);
  // Get the parent collection item
  let cmsItem = $(this).closest(".scroll-item");
  // Find content of .perdictionaccuracy paragraph text inside item
  let right = +cmsItem.find(".perdictionaccuracy").text();
  // Find content of .noaccuracy paragraph text inside item
  let wrong = +cmsItem.find(".noaccuracy").text();
  // Create charts
console.log(right)
console.log(wrong)

 
	var ctx1 = document.getElementById('canvas1');
	var canvas1 = new Chart(ctx1, {
		type: 'bar',
		data: {
			labels: ["1st", "2nd", "3rd", "4th", "5th"],
			datasets: [{
				label: 'Some Label',
				data: [10, 20, 30, 40, 50],
				backgroundColor: ["white","#A5DBFF","#B6E5F9","#D1F0FF","#8ED3FF"], 
			}]
		},
	});
  });
 
 $(document).ready( function(){
	$(".pointscount-adder .add-action").click( function(){
		if( $(this).hasClass('yes') ) {  
			$("[name=pointscount]",'.pointscount-adder').val( parseInt($("[name=pointscount]",'.quantity-adder').val()) + 1 );
		}else {
			if( parseInt($("[name=pointscount]",'.pointscount').val())  > 1 ) {
				$("input",'.pointscount').val( parseInt($("[name=quantity]",'.pointscount').val()) - 1 );
			}
		}
	} );
    
    });

  function timePast(curr, prev) {
    //define the milliseconds in every time unit
    var msMin = 60 * 1000;
    var msHr = msMin * 60;
    var msDay = msHr * 24;
    var msMonth = msDay * 30;
    var msYr = msDay * 365;

    //get elapsed time in milliseconds
    var elapsed = curr - prev;

    if (elapsed < msMin) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }
    else if (elapsed < msHr) {
      var elapsed = Math.round(elapsed/msMin);
      if (elapsed === 1) {        // Show singular or plural depending on return value
        return elapsed + ' minute ago';
      } else {
        return elapsed + ' minutes ago';
      }
    }
    else if (elapsed < msDay) {
      var elapsed = Math.round(elapsed/msHr);
      if (elapsed === 1) { 
        return elapsed + ' hour ago';
      } else {
        return elapsed + ' hours ago';
      }
    }
    else if (elapsed < msMonth) {
      var elapsed = Math.round(elapsed/msDay);
      if (elapsed === 1) {
        return elapsed + ' day ago';
      } else {
        return elapsed + ' days ago';
      }   
    }
    else if (elapsed < msYr) {
      var elapsed = Math.round(elapsed/msMonth);
      if (elapsed === 1) {
        return elapsed + ' month ago';
      } else {
        return elapsed + ' months ago';
      } 
    }
    else {
      var elapsed = Math.round(elapsed/msYr);
      if (elapsed === 1) {
        return elapsed + ' year ago';
      } else {
        return elapsed + ' years ago';
      }
    }
  }

  $('.post-date-5, .post-date-4,.post-date-3,.post-date-2,.post-date').each(function() { //replace '.post-date' with your date's class
    var now = new Date();
    var parsedTime = Date.parse($(this).text());
    $(this).text(timePast(now, new Date(parsedTime)));
  });
 $(document).ready( function(){
  $(".pointscount-adder .add-action").click( function(){
    if( $(this).hasClass('yes') ) {  
      $("[name=pointscount]",'.pointscount-adder').val( parseInt($("[name=pointscount]",'.quantity-adder').val()) + 1 );
    }else {
      if( parseInt($("[name=pointscount]",'.pointscount').val())  > 1 ) {
        $("input",'.pointscount').val( parseInt($("[name=quantity]",'.pointscount').val()) - 1 );
      }
    }
  } ); });
