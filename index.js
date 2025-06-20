// Veri kümesi - Para birimleri, Bitcoin, hisse senetleri
const data = [
  { symbol: "BTC", name: "Bitcoin", price: 410000, change: 0, history: [] },
  { symbol: "ETH", name: "Ethereum", price: 28000, change: 0, history: [] },
  { symbol: "USD", name: "ABD Doları", price: 27.50, change: 0, history: [] },
  { symbol: "EUR", name: "Euro", price: 29.20, change: 0, history: [] },
  { symbol: "TRY", name: "Türk Lirası", price: 1, change: 0, history: [] },
  { symbol: "GBP", name: "İngiliz Sterlini", price: 33.40, change: 0, history: [] },
  { symbol: "XAU", name: "Altın (gram)", price: 1900, change: 0, history: [] },
  { symbol: "AAPL", name: "Apple Inc.", price: 168, change: 0, history: [] },
  { symbol: "TSLA", name: "Tesla Inc.", price: 720, change: 0, history: [] },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 330, change: 0, history: [] },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800, change: 0, history: [] },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3500, change: 0, history: [] },
  { symbol: "DOGE", name: "Dogecoin", price: 1.15, change: 0, history: [] },
  { symbol: "XRP", name: "Ripple", price: 5.25, change: 0, history: [] },
  { symbol: "USDTRY", name: "Dolar / Türk Lirası", price: 27.50, change: 0, history: [] },
  { symbol: "EURUSD", name: "Euro / ABD Doları", price: 1.06, change: 0, history: [] },
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

// Rastgele fiyat değişimi simülasyonu ve history güncelleme
function simulatePriceChange() {
  data.forEach((item) => {
    const maxChangePercent = 0.005;
    const randomFactor = (Math.random() * 2 - 1) * maxChangePercent;
    const oldPrice = item.price;
    const newPrice = oldPrice * (1 + randomFactor);

    item.change = newPrice - oldPrice;
    item.price = parseFloat(newPrice.toFixed(4));

    // Fiyat geçmişini 30 kayıtla sınırla
    item.history.push(item.price);
    if (item.history.length > 30) {
      item.history.shift();
    }
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
      tr.setAttribute("tabindex", 0);
      tr.setAttribute("role", "button");
      tr.classList.toggle("selected", item.symbol === selectedAssetSymbol);
      tr.addEventListener("click", () => selectAsset(item.symbol));
      tr.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") selectAsset(item.symbol);
      });

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

// Seçilen varlık ve grafik
let selectedAssetSymbol = data[0].symbol;

// Chart.js grafiği
const ctx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [], // Zaman etiketleri, örn: saniye sayısı
    datasets: [{
      label: "",
      data: [],
      borderColor: "#00ff90",
      backgroundColor: "rgba(0, 255, 144, 0.2)",
      fill: true,
      tension: 0.25,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2,
      hoverBorderWidth: 3,
    }]
  },
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: '#444' },
        ticks: { color: '#a0a0c8' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#a0a0c8' },
      }
    },
    plugins: {
      legend: {
        labels: { color: '#00ff90', font: { weight: 'bold', size: 14 } }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: ctx => ctx.parsed.y.toFixed(4)
        }
      },
    },
  }
});

function updateChartAndInfo(symbol) {
  const asset = data.find(a => a.symbol === symbol);
  if (!asset) return;

  // Zaman etiketleri olarak basit sayılar (son 30 saniye)
  const labels = asset.history.map((_, i) => `-${asset.history.length - i}s`);

  priceChart.data.labels = labels;
  priceChart.data.datasets[0].label = `${asset.name} (${asset.symbol})`;
  priceChart.data.datasets[0].data = asset.history;
  
  // Renk ayarı (eğer fiyat arttıysa yeşil, düştüyse kırmızı)
  const lastChange = asset.change;
  priceChart.data.datasets[0].borderColor = lastChange >= 0 ? '#00ff90' : '#ff3b3b';
  priceChart.data.datasets[0].backgroundColor = lastChange >= 0 ? 'rgba(0,255,144,0.2)' : 'rgba(255,59,59,0.2)';

  priceChart.update();

  const changeSign = asset.change >= 0 ? "+" : "";
  const infoText = `
Güncel Fiyat: <strong>${asset.price}</strong>
Değişim: <strong>${changeSign}${asset.change.toFixed(4)}</strong>

Son 30 saniyenin fiyat geçmişi grafikte gösterilmektedir.
  `;

  document.getElementById("detailTitle").querySelector("span").textContent = `${asset.name} (${asset.symbol})`;
  document.getElementById("info-text").innerHTML = infoText;
}

// Seçim fonksiyonu
function selectAsset(symbol) {
  selectedAssetSymbol = symbol;
  updateTable(document.getElementById("searchBox").value);
  updateChartAndInfo(symbol);
}

// Arama input event
document.getElementById("searchBox").addEventListener("input", (e) => {
  updateTable(e.target.value);
});

// Döngü ve güncellemeler
function mainLoop() {
  updateTime();
  simulatePriceChange();
  updateTable(document.getElementById("searchBox").value);
  updateChartAndInfo(selectedAssetSymbol);
}

selectAsset(selectedAssetSymbol);
setInterval(mainLoop, 1000);
