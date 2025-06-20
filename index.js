async function fetchCryptoData() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=50&page=1&sparkline=false');
  const cryptos = await response.json();

  return cryptos.map(c => ({
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    price: c.current_price,
    change: c.price_change_percentage_24h,
  }));
}

async function updateTableWithApiData(filter = '') {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  filter = filter.toLowerCase();

  const data = await fetchCryptoData();

  data.forEach(item => {
    if (
      item.symbol.toLowerCase().includes(filter) ||
      item.name.toLowerCase().includes(filter)
    ) {
      const tr = document.createElement("tr");

      const priceCell = document.createElement("td");
      priceCell.textContent = item.price.toFixed(4) + " ₺";

      const changeCell = document.createElement("td");
      changeCell.textContent = (item.change >= 0 ? "+" : "") + item.change.toFixed(2) + "%";

      if (item.change > 0) changeCell.classList.add("green");
      else if (item.change < 0) changeCell.classList.add("red");

      tr.innerHTML = `<td>${item.symbol}</td><td>${item.name}</td>`;
      tr.appendChild(priceCell);
      tr.appendChild(changeCell);

      tbody.appendChild(tr);
    }
  });
}

// Her 60 saniyede bir güncelle
setInterval(() => {
  updateTableWithApiData(searchBox.value);
  updateTime();
}, 60000);

// İlk yükleme
updateTableWithApiData();
updateTime();
