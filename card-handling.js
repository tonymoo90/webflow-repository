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
    value = -Math.abs($('.text-block-80[data-bind='+ JSON.stringify($(this)[0].dataset.bind) + ']').text())
  if (JSON.parse($( '.text-block-80[data-bind='+ JSON.stringify( $(this)[0].dataset.bind ) + ']').text()) <= JSON.parse(document.getElementById("txtNumber").value)) {
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


//

$('.card-back-latest').each(function (index) {
    rando = Math.random()
       $(this).children().each(function(index) {
          if ($(this).hasClass("text-block-80")) {
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
       })
  });

//

