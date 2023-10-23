<script>
  let allTransactions; //

  // Load price
  d3.json("https://pulse-stockprice.s3.us-east-2.amazonaws.com/stockprice.json").then(data => {
    data.forEach(d => {
      d.date = new Date(d.date); // string to date
      d.price = +d.value; // string to number
    });

    //dimensions and margins for chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    //scales for x & y axes
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Create line
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.price));

    // Create SVG
    const svg = d3.select("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Append line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .style("filter", "url(#glow)"); // Apply a filter if needed

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Stock Price Chart");
      
    // Load txns data from API
    d3.json("https://pulsemedia-10eb81c0dde4.herokuapp.com/insider_transactions?ticker=tsla.us").then(transactions => {
      allTransactions = transactions; // Store txns
      // Append txns as dots
      svg.selectAll(".dot")
        .data(transactions)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", d => Math.sqrt(d.transactionAmount) / 100) // Size by txn amoiunt
        .attr("cx", d => x(new Date(d.transactionDate)))
        .attr("cy", d => y(d.transactionPrice))
        .style("fill", "rgba(255, 0, 0, 0.5")
        .on("mouseover", function(event, d) {
          // Show tooltip
          let tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(`${d.ownerName}<br>Transaction Details:<br>Date: ${d.transactionDate}<br>Price: ${d.transactionPrice}<br>Amount: ${d.transactionAmount}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
          // Highlight row
          d3.select("#row-" + d.ticker).style("background-color", "lightblue");
        })
        .on("mouseout", function(event, d) {
          // Hide tooltip
          d3.select(".tooltip").remove();
          // Remove highlight
          d3.select("#row-" + d.ticker).style("background-color", null);
        });

      // Populate table
      const table = d3.select("#transaction-table");
      transactions.forEach(d => {
        const newRow = table.append("tr").attr("id", "row-" + d.ticker);
        newRow.append("td").text(d.ownerName);
        newRow.append("td").text(d.transactionDate);
        newRow.append("td").text(d.transactionPrice);
        newRow.append("td").text(d.transactionAmount);
        newRow.append("td").text(d.transactionAcquiredDisposed === 'A' ? 'Bought' : 'Sold');
      });
      
      // Get ownernames
      function getUniqueOwnerNames(transactions) {
        const ownerSet = new Set();
        transactions.forEach(transaction => ownerSet.add(transaction.ownerName));
        return Array.from(ownerSet); // Set to Array
      }
      // create filter buttons
      function createOwnerFilterButtons() {
        const uniqueOwnerNames = getUniqueOwnerNames(allTransactions);
        const buttonsContainer = document.getElementById('ownerFilterButtons');
        buttonsContainer.innerHTML = ''; // Clear

        uniqueOwnerNames.forEach(ownerName => {
          const button = document.createElement('button');
          button.textContent = ownerName;
          button.setAttribute('data-owner', ownerName.replace(/\s+/g, '').toLowerCase());
          button.classList.add('ownerFilterButton');
          button.addEventListener('click', handleOwnerFilterClick); // Add  listener
          buttonsContainer.appendChild(button);
        });
      }

      createOwnerFilterButtons();
      // display filtered txns
      function displayInsiderTransactions(transactions) {
        // Clear dots
        svg.selectAll(".dot").remove();

        // Append txns as dots
        svg.selectAll(".dot")
          .data(transactions)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", d => Math.sqrt(d.transactionAmount) / 100) // Size by transactionAmount
          .attr("cx", d => x(new Date(d.transactionDate)))
          .attr("cy", d => y(d.transactionPrice))
          .style("fill", "rgba(255, 0, 0, 0.5")
          .on("mouseover", function(event, d) {
            // Show tooltip
          let tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(`${d.ownerName}<br>Transaction Details:<br>Date: ${d.transactionDate}<br>Price: ${d.transactionPrice}<br>Amount: ${d.transactionAmount}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
          
          // Highlight row
          d3.select("#row-" + d.ticker).style("background-color", "lightblue");
        })
        .on("mouseout", function(event, d) {
        
          // Hide tooltip
          d3.select(".tooltip").remove();
          // Remove highlight
          d3.select("#row-" + d.ticker).style("background-color", null);
        });

      // Clear table and populate with filter data
      const table = d3.select("#transaction-table");
      table.selectAll("tr").remove();

      table.append("tr")
        .append("th").text("Owner Name")
        .append("th").text("Transaction Date")
        .append("th").text("Transaction Price")
        .append("th").text("Transaction Amount")
        .append("th").text("Transaction Type");

      transactions.forEach(d => {
        const newRow = table.append("tr").attr("id", "row-" + d.ticker);
        newRow.append("td").text(d.ownerName);
        newRow.append("td").text(d.transactionDate);
        newRow.append("td").text(d.transactionPrice);
        newRow.append("td").text(d.transactionAmount);
        newRow.append("td").text(d.transactionAcquiredDisposed === 'A' ? 'Bought' : 'Sold');
      });
    }
    // handle owner click
    function handleOwnerFilterClick(e) {
      const ownerNameFormatted = e.target.getAttribute('data-owner');
      const filteredData = allTransactions.filter(data => data.ownerName.replace(/\s+/g, '').toLowerCase() === ownerNameFormatted);
      // display txns based on filtered data
      displayInsiderTransactions(filteredData);
    }
    // handle click on filter buttons
    document.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('ownerFilterButton')) {
        handleOwnerFilterClick(e);
      }
    });
    
    // display all txns
    function displayAllTransactions() {
      displayInsiderTransactions(allTransactions);
    }
    // filter txns by type
    function filterTransactionsByAcquiredDisposed(type) {
      if (type === 'All') {
        displayAllTransactions();
      } else {
        const filteredData = allTransactions.filter(data => data.transactionAcquiredDisposed === type);
        displayInsiderTransactions(filteredData);
      }
    }
    // handling owner filters
    function handleOwnerFilterClick(e) {
      const ownerNameFormatted = e.target.getAttribute('data-owner');
      const filteredData = allTransactions.filter(data => data.ownerName.replace(/\s+/g, '').toLowerCase() === ownerNameFormatted);
      displayInsiderTransactions(filteredData);
    }
    document.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('ownerFilterButton')) {
        handleOwnerFilterClick(e);
      } else if (e.target && e.target.classList.contains('acquiredDisposedFilterButton')) {
    const type = e.target.getAttribute('data-type');
    filterTransactionsByAcquiredDisposed(type);
  }
    });
  }).catch(error => {
    console.error("Error fetching insider transactions data:", error);
  });
}).catch(error => {
  console.error("Error fetching or processing stock price data:", error);
});
</script>