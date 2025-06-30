const user = {
  name: "",
  balance: 10000,
  usd: 0,
  btc: 0
};

const rates = {
  USD: 30,
  BTC: 500000
};

function createAccount() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Ad gir!");

  user.name = name;
  document.getElementById("login").style.display = "none";
  document.getElementById("panel").style.display = "block";
  document.getElementById("user-name").textContent = user.name;

  updateUI();
  loadMarket();
}

function updateUI() {
  document.getElementById("balance").textContent = user.balance.toFixed(2);
  document.getElementById("usd").textContent = user.usd.toFixed(2);
  document.getElementById("btc").textContent = user.btc.toFixed(6);
}

function buy() {
  const type = document.getElementById("currency").value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) return alert("Geçersiz tutar!");

  if (user.balance < amount) return alert("Yetersiz TRYcoin!");

  const bought = amount / rates[type];
  user.balance -= amount;
  user[type.toLowerCase()] += bought;
  updateUI();
}

function sell() {
  const type = document.getElementById("currency").value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) return alert("Geçersiz tutar!");

  const needed = amount / rates[type];
  const has = user[type.toLowerCase()];
  if (has < needed) return alert("Yetersiz " + type);

  user[type.toLowerCase()] -= needed;
  user.balance += amount;
  updateUI();
}

function loadMarket() {
  const market = document.getElementById("market");
  const products = [
    { name: "iPhone", price: 20000 },
    { name: "PC", price: 30000 },
    { name: "Klavye", price: 1000 }
  ];

  products.forEach(p => {
    const item = document.createElement("p");
    item.innerHTML = `${p.name} - ${p.price} TRY <button onclick="buyItem(${p.price})">Al</button>`;
    market.appendChild(item);
  });
}

function buyItem(price) {
  if (user.balance < price) return alert("Bakiye yetersiz!");
  user.balance -= price;
  alert("Ürün satın alındı!");
  updateUI();
}