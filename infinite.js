const yesWagers = []
const noWagers = [] 
fetch('https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Bets?filterByFormula=NOT({Member ID}!='+JSON.stringify(JSON.parse(localStorage.getItem('memberstack')).information.id)+')', {
  headers: {
    'Authorization': 'Bearer keyzsJA5PVzv64Oem'
  },
})
.then(response => response.json())
.then(data => {
    data.records.forEach(r => {
        if (r.fields.Choice === 'true') {
        yesWagers.push(r.fields['Article ID'])
        }
        else {
          noWagers.push(r.fields['Article ID'])  
        }
      }
    )
})
.then (data => {
       styles = "background-color:  #cccccc; pointer-events: none; color: transparent; border: 1px solid #999999;"
       cursor = "cursor: not-allowed !important"
       $('.button-3').each(function(index) { 
        if (yesWagers.includes($(this).text())) {
              $(this).attr('style', styles)
              $(this).parent().attr('style', cursor)
            }  
      })
      $('.button-5').each(function(index) { 
        if (noWagers.includes($(this).text())) {
              $(this).attr('style', styles)
              $(this).parent().attr('style', cursor)
            }  
      })
      $('.wager-countdown').each(function(index) { 
        if  ($(this).text() === "CLOSED" ) {
          $('.button-5[data-bind='+ JSON.stringify($(this)[0].dataset.bind) + ']').attr('style', styles)
          $('.button-3[data-bind='+ JSON.stringify($(this)[0].dataset.bind) + ']').attr('style', styles)
        } 
      })

})
.catch((error) => {
  console.error('Error:', error);
});

function togglePopup(valid) {
    if (!valid) {
       document.getElementById("popup-1").classList.toggle("active");
    } else {
      document.getElementById("popup-2").classList.toggle("active");
    }
}

function wagerAlreadyPlaced() {
      document.getElementById("popup-3").classList.toggle("active");
}

$('.popup-close-btn_1').click(function() { togglePopup(false); $('.confirm_button_yes, .confirm_button_no').unbind() })
$('.popup-close-btn_2').click(function() { togglePopup(true); $('.confirm_button_yes, .confirm_button_no').unbind() })
$('.popup-close-btn_3').click(function() { wagerAlreadyPlaced()})
$(".button-3, .button-5").click(function() {
    article_id = $(this).text()
    choice = true ? $(this).hasClass("button-3") : false
    value = -Math.abs($('.idtext[data-bind='+ JSON.stringify($(this)[0].dataset.bind) + ']').text())
  if (JSON.parse($('.idtext[data-bind='+ JSON.stringify( $(this)[0].dataset.bind ) + ']').text()) <= JSON.parse(document.getElementById("txtNumber").value)) {
     togglePopup(true)
    if ($(this).hasClass("button-3")) {
        $('.wager_button').addClass("confirm_button_yes")
    }
    else if ($(this).hasClass("button-5")) {
        $('.wager_button').addClass("confirm_button_no")
    }
    $(".confirm_button_yes, .confirm_button_no").click(function () {
    if ($(value).text() <= document.getElementById("txtNumber").value) {
    fetch('https://collect.tealiumiq.com/event', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify({
        "member_id": JSON.parse(localStorage.getItem('memberstack')).information.id || 'unknown',
        "article_id": article_id,
        "choice":choice,
        "value": value,
        "tealium_account": "services-jj-daurora",
        "tealium_profile": "main"
        }),
    })
    .then(response => console.log(response))
    .then(data => {
          $("#popup-2").html(
          '<div class="content"><h3>Placing wager...</h3><div class="snippet" data-title=".dot-stretching"><div class="stage"><div class="dot-stretching"></div></div></div></div>'
        );
        moveBar()      
    })   
    setTimeout(() => {
    fetch('https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Bets?filterByFormula=NOT({Member ID}!='+JSON.stringify(JSON.parse(localStorage.getItem('memberstack')).information.id)+')', {
         headers: {Authorization: 'Bearer keyzsJA5PVzv64Oem'}
        })
      .then( resp => resp.json() )
      .then( json => {
      newWalletBalance = Object.values(json.records).map(r => r.fields.Value).reduce((partialSum, a) => partialSum + a, 0)
      setTimeout(() => {document.getElementById("txtNumber").value = newWalletBalance}, 2000);
    })
    }, 5000);
  }
});
  } else {
    togglePopup(false)
  }
})


  function timePast(curr, prev) {
    var msMin = 60 * 1000;
    var msHr = msMin * 60;
    var msDay = msHr * 24;
    var msMonth = msDay * 30;
    var msYr = msDay * 365;
    var elapsed = curr - prev;
    if (elapsed < msMin) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }
    else if (elapsed < msHr) {
      var elapsed = Math.round(elapsed/msMin);
      if (elapsed === 1) {     
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


  $('.card-back-latest').each(function (index) {
    rando = Math.random()
    $(this).children().each(function(index) {
      if ($(this).hasClass("text-block-80 idtext")) {
          $(this).attr("data-bind", rando)
      }
      if ($(this).hasClass("jetboost-toggle-favorite-kvbw")) {
          $(this).children().each(function(index) {
            if ($(this).hasClass("item-is-not-favorite")) {
                $(this).children().each(function(index) {
                  if ($(this).hasClass("button-3")) {
                      $(this).attr("data-bind", rando)
                  }
                })
            }
          })
      }
      if ($(this).hasClass("jetboost-toggle-favorite-k6rr")) {
          $(this).children().each(function(index) {
            if ($(this).hasClass("item-is-not-favorite2")) {
                $(this).children().each(function(index) {
                  if ($(this).hasClass("button-5")) {
                      $(this).attr("data-bind", rando)
                  }
                })
            }
          })
      }
      if ($(this).hasClass("div-block-419")) {
        $(this).children().each(function(index) {
          if ($(this).hasClass("html-embed-28 w-embed w-script")) {
            $(this).children().each(function(index) {
              if ($(this).hasClass("wager-countdown")) {
                  $(this).attr("data-bind", rando)
              }    
            })
          }
        })
      }  
    })
  });

 


$("canvas").each(function (index) {
  let idName = `chart1${index}`;
  $(this).attr("id", idName);
  let cmsItem = $(this).closest(".collection-item-4, .card-item-negative, .collection-item-7, .collection-item-10");
  let right = +cmsItem.find(".perdictionaccuracy").text();
  let wrong = +cmsItem.find(".noaccuracy").text();
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


$("canvas1").each(function (index) {
  let idName = `chart2${index}`;
  $(this).attr("id", idName);
  let cmsItem = $(this).closest(".collection-item-4, .card-item-negative, .collection-item-7, .collection-item-10, .item4");
  let right = +cmsItem.find(".perdictionaccuracy").text();
  let wrong = +cmsItem.find(".noaccuracy").text();
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
   function change(value){
   document.getElementById("count").value= 1*value;
   document.getElementById("totalValue").innerHTML= 20*value;
     }
 