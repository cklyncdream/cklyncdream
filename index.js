const simulatedData = [
  // Örnek ülke para birimleri ve ünlü hisse senetleri (simüle ediliyor)
  { symbol: "USD", name: "ABD Doları", price: 27.5, change: 0 },
  { symbol: "EUR", name: "Euro", price: 29.2, change: 0 },
  { symbol: "TRY", name: "Türk Lirası", price: 1, change: 0 },
  { symbol: "GBP", name: "İngiliz Sterlini", price: 33.4, change: 0 },
  { symbol: "AAPL", name: "Apple Inc.", price: 168, change: 0 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 720, change: 0 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 330, change: 0 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800, change: 0 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3500, change: 0 },
  // İstersen buraya 50+ yeni veri ekle!
];

// İstanbul saatine göre güncel saat göstergesi
function updateTime() {
  const options = {
    timeZone: "Europe/Istanbul",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const now = new Date().toLocaleString("tr-TR", options);
  document.getElementById("time").innerText = "Güncel Saat (İstanbul): " + now;
}

// CoinGecko API'den kripto para verisi çek (TRY bazlı)
async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    const cryptos = await response.json();

    return cryptos.map((c) => ({
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      price: c.current_price,
      change: c.price_change_percentage_24h,
    }));
  } catch (e) {
    console.error("Kripto verisi alınamadı:", e);
    return [];
  }
}

// Simüle fiyat değişikliği (simulatedData için)
function simulatePriceChange() {
  simulatedData.forEach((item) => {
    const maxChangePercent = 0.005;
    const randomFactor = (Math.random() * 2 - 1) * maxChangePercent;
    const oldPrice = item.price;
    const newPrice = oldPrice * (1 + randomFactor);

    item.change = newPrice - oldPrice;
    item.price = parseFloat(newPrice.toFixed(4));
  });
}

// Tabloyu güncelle (hem simüle veriyi hem gerçek kriptoyu)
async function updateTable(filter = "") {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  filter = filter.toLowerCase();

  // Simüle veriyi güncelle
  simulatePriceChange();

  // Gerçek kripto verisini çek
  const cryptoData = await fetchCryptoData();

  // Tüm verileri birleştir
  const allData = [...simulatedData, ...cryptoData];

  allData.forEach((item) => {
    if (
      item.symbol.toLowerCase().includes(filter) ||
      item.name.toLowerCase().includes(filter)
    ) {
      const tr = document.createElement("tr");

      const priceCell = document.createElement("td");
      priceCell.textContent = typeof item.price === "number"
        ? item.price.toFixed(4) + (item.symbol === "XAU" ? " ₺" : " ₺")
        : item.price;

      const changeCell = document.createElement("td");
      let changeText = "";
      if ("change" in item) {
        if (Math.abs(item.change) < 1 && item.change !== 0) {
          changeText = (item.change > 0 ? "+" : "") + (item.change * 100).toFixed(2) + "%";
        } else {
          changeText = (item.change > 0 ? "+" : "") + item.change.toFixed(4);
        }
      } else {
        changeText = "-";
      }
      changeCell.textContent = changeText;

      if (item.change > 0) changeCell.classList.add("green");
      else if (item.change < 0) changeCell.classList.add("red");

      tr.innerHTML = `<td>${item.symbol}</td><td>${item.name}</td>`;
      tr.appendChild(priceCell);
      tr.appendChild(changeCell);

      tbody.appendChild(tr);
    }
  });
}

// Arama kutusu dinleme
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", () => {
  updateTable(searchBox.value);
});

// Her 60 saniyede bir güncelle
setInterval(() => {
  updateTable(searchBox.value);
  updateTime();
}, 60000);

// İlk yükleme
updateTable();
updateTime();
