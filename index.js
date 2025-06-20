// Veri kümesi - Para birimleri, Bitcoin, hisse senetleri ve daha fazlası (65+ öğe)
const data = [
  { symbol: "BTC", name: "Bitcoin", price: 410000, change: 0 },
  { symbol: "ETH", name: "Ethereum", price: 28000, change: 0 },
  { symbol: "USD", name: "ABD Doları", price: 27.50, change: 0 },
  { symbol: "EUR", name: "Euro", price: 29.20, change: 0 },
  { symbol: "TRY", name: "Türk Lirası", price: 1, change: 0 },
  { symbol: "GBP", name: "İngiliz Sterlini", price: 33.40, change: 0 },
  { symbol: "XAU", name: "Altın (gram)", price: 1900, change: 0 },
  { symbol: "AAPL", name: "Apple Inc.", price: 168, change: 0 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 720, change: 0 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 330, change: 0 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800, change: 0 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3500, change: 0 },
  { symbol: "DOGE", name: "Dogecoin", price: 1.15, change: 0 },
  { symbol: "XRP", name: "Ripple", price: 5.25, change: 0 },
  { symbol: "USDTRY", name: "Dolar / Türk Lirası", price: 27.50, change: 0 },
  { symbol: "EURUSD", name: "Euro / ABD Doları", price: 1.06, change: 0 },

  // Yeni eklenenler:

  { symbol: "BNB", name: "Binance Coin", price: 4500, change: 0 },
  { symbol: "ADA", name: "Cardano", price: 8.50, change: 0 },
  { symbol: "SOL", name: "Solana", price: 450, change: 0 },
  { symbol: "DOGE", name: "Dogecoin", price: 1.15, change: 0 },
  { symbol: "LTC", name: "Litecoin", price: 1100, change: 0 },
  { symbol: "SHIB", name: "Shiba Inu", price: 0.000012, change: 0 },
  { symbol: "AVAX", name: "Avalanche", price: 220, change: 0 },
  { symbol: "MATIC", name: "Polygon", price: 28, change: 0 },
  { symbol: "DOT", name: "Polkadot", price: 150, change: 0 },
  { symbol: "UNI", name: "Uniswap", price: 100, change: 0 },
  { symbol: "XLM", name: "Stellar", price: 3.5, change: 0 },
  { symbol: "LINK", name: "Chainlink", price: 125, change: 0 },
  { symbol: "ALGO", name: "Algorand", price: 35, change: 0 },
  { symbol: "VET", name: "VeChain", price: 2.6, change: 0 },
  { symbol: "FIL", name: "Filecoin", price: 400, change: 0 },
  { symbol: "ICP", name: "Internet Computer", price: 350, change: 0 },
  { symbol: "AAVE", name: "Aave", price: 1800, change: 0 },
  { symbol: "FTT", name: "FTX Token", price: 430, change: 0 },
  { symbol: "THETA", name: "Theta", price: 60, change: 0 },
  { symbol: "XMR", name: "Monero", price: 2900, change: 0 },
  { symbol: "EOS", name: "EOS", price: 90, change: 0 },
  { symbol: "TRX", name: "Tron", price: 1.85, change: 0 },
  { symbol: "NEO", name: "NEO", price: 320, change: 0 },
  { symbol: "KRW", name: "Güney Kore Wonu", price: 0.022, change: 0 },
  { symbol: "JPY", name: "Japon Yeni", price: 0.20, change: 0 },
  { symbol: "CHF", name: "İsviçre Frangı", price: 30.5, change: 0 },
  { symbol: "CAD", name: "Kanada Doları", price: 21.4, change: 0 },
  { symbol: "AUD", name: "Avustralya Doları", price: 18.5, change: 0 },
  { symbol: "NZD", name: "Yeni Zelanda Doları", price: 16.7, change: 0 },
  { symbol: "CNY", name: "Çin Yuanı", price: 4.1, change: 0 },
  { symbol: "SGD", name: "Singapur Doları", price: 20, change: 0 },
  { symbol: "HKD", name: "Hong Kong Doları", price: 3.5, change: 0 },
  { symbol: "ZAR", name: "Güney Afrika Randı", price: 1.85, change: 0 },
  { symbol: "BRL", name: "Brezilya Reali", price: 5.5, change: 0 },
  { symbol: "MXN", name: "Meksika Pesosu", price: 1.5, change: 0 },
  { symbol: "INR", name: "Hindistan Rupisi", price: 0.35, change: 0 },
  { symbol: "RUB", name: "Rus Rublesi", price: 0.37, change: 0 },
  { symbol: "SAR", name: "Suudi Riyali", price: 7.3, change: 0 },
  { symbol: "AED", name: "BAE Dirhemi", price: 7.5, change: 0 },
  { symbol: "TRYX", name: "Türk Lirası (Alternatif)", price: 1, change: 0 },
  { symbol: "INTC", name: "Intel Corp.", price: 55, change: 0 },
  { symbol: "CSCO", name: "Cisco Systems", price: 55, change: 0 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 700, change: 0 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 550, change: 0 },
  { symbol: "PYPL", name: "PayPal Holdings", price: 250, change: 0 },
  { symbol: "BABA", name: "Alibaba Group", price: 140, change: 0 },
  { symbol: "DIS", name: "Walt Disney Co.", price: 150, change: 0 },
  { symbol: "ADBE", name: "Adobe Inc.", price: 530, change: 0 },
  { symbol: "CRM", name: "Salesforce.com", price: 240, change: 0 },
  { symbol: "UBER", name: "Uber Technologies", price: 50, change: 0 },
  { symbol: "TWTR", name: "Twitter, Inc.", price: 45, change: 0 },
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

// Rastgele fiyat değişimi simülasyonu
function simulatePriceChange() {
  data.forEach((item) => {
    // Fiyatı değiştir, -%0.5 ile +%0.5 arasında rastgele
    const maxChangePercent = 0.005;
    const randomFactor = (Math.random() * 2 - 1) * maxChangePercent;
    const oldPrice = item.price;
    const newPrice = oldPrice * (1 + randomFactor);

    item.change = newPrice - oldPrice;
    item.price = parseFloat(newPrice.toFixed(4));
  });
}

// Tabloyu güncelle
function updateTable(filter = "") {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  filter = filter.toLowerCase();

  data.forEach((item) => {
    if (
      item.symbol.toLowerCase().includes(filter) ||
      item.name.toLowerCase().includes(filter)
    ) {
      const tr = document.createElement("tr");

      const priceCell = document.createElement("td");
      priceCell.textContent =
        item.symbol === "XAU" ? item.price.toFixed(2) + " ₺" : item.price;

      const changeCell = document.createElement("td");
      changeCell.textContent =
        (item.change >= 0 ? "+" : "") + item.change.toFixed(4);

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

// Her saniye fiyatları simüle et ve tabloyu güncelle
setInterval(() => {
  simulatePriceChange();
  updateTable(searchBox.value);
  updateTime();
}, 1000);

// İlk yükleme
simulatePriceChange();
updateTable();
updateTime();
