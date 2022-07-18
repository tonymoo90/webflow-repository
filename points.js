document.getElementsByClassName("wrapper-section wf-section")[0].style.display = "block"

const list = document.getElementsByClassName("scroll-table-content")[0]
fetch('https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Bets?filterByFormula=NOT({Member ID}!='+JSON.stringify(JSON.parse(localStorage.getItem('memberstack')).information.id)+')', {
         headers: {Authorization: 'Bearer keyzsJA5PVzv64Oem'}
        })
      .then( resp => resp.json() )
      .then( json => {
        json.records.forEach(f => {
            console.log(f.fields)
            let row = document.createElement("div")
            row.setAttribute("class", "table-row")
            list.appendChild(row)

            let rowNr = document.createElement("div")
      
            let tableBoxName = document.createElement("div")
            tableBoxName.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxName)
            let img = document.createElement("img")
            img.setAttribute("class", "image-35")
            img.setAttribute("width", "32")
            img.setAttribute("sizes", "32px")
            img.setAttribute("src", "https://via.placeholder.com/150")
            let name = document.createElement("div")
            name.setAttribute("class", "table-data name")

            //date handling
            let betDate = new Date(f.fields['Selection Date'])
            betDate.toISOString().split('T')[0]
            const offset = betDate.getTimezoneOffset()
            betDate = new Date(betDate.getTime() - (offset*60*1000))
                        
            name.innerHTML = betDate.toISOString().split('T')[0]
            tableBoxName.appendChild(img)
            tableBoxName.appendChild(name)

            let tableBoxQuestion = document.createElement("div")
            tableBoxQuestion.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxQuestion)
            let question = document.createElement("div")
            question.setAttribute("class", "table-data")
            question.innerHTML = f.fields['Question (from carddata)']
            tableBoxQuestion.appendChild(question)

            let tableBoxBalance = document.createElement("div")
            tableBoxBalance.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxBalance)
            let balance = document.createElement("div")
            balance.setAttribute("class", "table-data")
            
            if (f.fields['Closing Date (from Linked Betting Line ID)'] && f.fields['Closing Date (from Linked Betting Line ID)'][0] && f.fields.Category === "winnings")  {
              tableBoxBalance.setAttribute("style",'text-align: center;justify-content: center;align-items: center;background:#00b300;font-weight: bold;width: 5%; ')
            }

            else if (f.fields['Closing Date (from Linked Betting Line ID)'] && f.fields['Closing Date (from Linked Betting Line ID)'][0] && f.fields.Category !== "winnings")  {
              tableBoxBalance.setAttribute("style",'text-align: center;justify-content: center;align-items: center;background:#FF0000;font-weight: bold;width: 5%; ')
            }

            else if (!f.fields['Closing Date (from Linked Betting Line ID)'] || f.fields.Category !== "winnings" ) {
              tableBoxBalance.setAttribute("style",'text-align: center;justify-content: center;align-items: center;background:#EBEBE4;font-weight: bold;width: 5%; ')
              
            }

            if (f.fields.choice && (f.fields.choice === true || f.fields.choice === "true")) {
              balance.innerHTML = 'YES' 
            }
            
            else {
              balance.innerHTML = ' NO' 
            }

            tableBoxBalance.appendChild(balance)

            let tableBoxPending = document.createElement("div")
            tableBoxPending.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxPending)
            let pending = document.createElement("div")
            pending.setAttribute("class", "table-data")
            
            if (f.fields.Value > 0) {
              pending.innerHTML = '+' + f.fields.Value 
            }
            else {
              pending.innerHTML = f.fields.Value 
            }
            tableBoxPending.appendChild(pending)

            let tableBoxDate = document.createElement("div")
            tableBoxDate.setAttribute("class", "table-box _2 small")
            row.appendChild(tableBoxDate)
            let date = document.createElement("div")
            date.setAttribute("class", "table-data")
            date.innerHTML = 1000
            tableBoxDate.appendChild(date)    
        })
    })
.catch(error => {
  console.log(error)
});

