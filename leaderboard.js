const list = document.getElementsByClassName("scroll-table-content")[0]
fetch('https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Leadersboard', {
    headers: {
        Authorization: 'Bearer keyzsJA5PVzv64Oem'
    }
})
.then(response => response.json())
.then(result => {

    const sorted = result.records.sort((a,b) => { return b.fields.Points - b.fields.Points}).reverse()

        sorted.forEach((record, i ) => { 

            let row = document.createElement("div")
            row.setAttribute("class", "table-row")
            list.appendChild(row)

            let rowDivBlock = document.createElement("div");
            rowDivBlock.setAttribute("class", "div-block-406 _2");
        row.appendChild(rowDivBlock);

        let rowNr = document.createElement("div")
        rowNr.setAttribute("class", "table-row-nr")
        rowNr.innerHTML = i + 1
        rowDivBlock.appendChild(rowNr)

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
        name.innerHTML = record.fields.Name
        tableBoxName.appendChild(img)
        tableBoxName.appendChild(name)

        let tableBoxBalance = document.createElement("div")
        tableBoxBalance.setAttribute("class", "table-box _2")
        row.appendChild(tableBoxBalance)
        let balance = document.createElement("div")
        balance.setAttribute("class", "table-data")
        balance.innerHTML = record.fields.Points
        tableBoxBalance.appendChild(balance)

        let tableBoxPending = document.createElement("div")
        tableBoxPending.setAttribute("class", "table-box _2")
        row.appendChild(tableBoxPending)
        let pending = document.createElement("div")
        pending.setAttribute("class", "table-data")
        pending.innerHTML = Math.abs(record.fields['Pending Points'])
        tableBoxPending.appendChild(pending)

        let tableBoxDate = document.createElement("div")
        tableBoxDate.setAttribute("class", "table-box _2 small")
        row.appendChild(tableBoxDate)
        let date = document.createElement("div")
        date.setAttribute("class", "table-data")
        date.innerHTML = record.fields['Date Joined']
        tableBoxDate.appendChild(date)
        
    })
})
.catch(error => {
    console.error('Error:', error);
});

