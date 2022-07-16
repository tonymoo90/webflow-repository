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

            // let rowDivBlock = document.createElement("div");
            // rowDivBlock.setAttribute("class", "div-block-406 _2");
            // row.appendChild(rowDivBlock);

            let rowNr = document.createElement("div")
            // rowNr.setAttribute("class", "table-row-nr")
            // rowNr.innerHTML = "poop"
            // rowDivBlock.appendChild(rowNr)

            let tableBoxDate = document.createElement("div")
            tableBoxDate.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxDate)
            let img = document.createElement("img")
            img.setAttribute("class", "image-35")
            img.setAttribute("width", "32")
            img.setAttribute("sizes", "32px")
            img.setAttribute("src", "https://via.placeholder.com/150")
            let date = document.createElement("div")
            date.setAttribute("class", "table-data name")
            date.innerHTML = f.fields['Selection Date']
            tableBoxDate.appendChild(img)
            tableBoxDate.appendChild(date)

            let tableBoxBalance = document.createElement("div")
            tableBoxBalance.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxBalance)
            let balance = document.createElement("div")
            balance.setAttribute("class", "table-data")
            balance.innerHTML = f.fields.Choice
            tableBoxBalance.appendChild(balance)

            let tableBoxPending = document.createElement("div")
            tableBoxPending.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxPending)
            let pending = document.createElement("div")
            pending.setAttribute("class", "table-data")
            pending.innerHTML = f.fields.Value
            tableBoxPending.appendChild(pending)

            let tableBoxDate = document.createElement("div")
            tableBoxDate.setAttribute("class", "table-box _2 small")
            row.appendChild(tableBoxDate)
            let date = document.createElement("div")
            date.setAttribute("class", "table-data")
            date.innerHTML = f.fields['Date Joined']
            tableBoxDate.appendChild(date)    
        })
    })
.catch(error => {
  console.log(error)
});

