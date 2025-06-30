let user = {
  name: "",
  balance: 0,
  btc: 0
};

const btcRate = 50000; // 1 BTC = 50.000 TRYcoin

function createAccount() {
  const nameInput = document.getElementById("username");
  const name = nameInput.value.trim();
  if (!name) return alert("Lütfen bir isim gir!");

  user.name = name;
  user.balance = 10000; // Başlangıç bakiyesi
  user.btc = 0;

  document.getElementById("setup").style.display = "none";
  document.getElementById("panel").style.display = "block";
  document.getElementById("displayName").textContent = user.name;
  updateUI();
}

function updateUI() {
  document.getElementById("balance").textContent = user.balance.toFixed(2);
  document.getElementById("btc").textContent = user.btc.toFixed(6);
}

function buy() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) return alert("Geçerli bir miktar gir!");
  if (amount > user.balance) return alert("Yetersiz bakiye!");

  const btcAmount = amount / btcRate;
  user.balance -= amount;
  user.btc += btcAmount;
  updateUI();
}

function sell() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) return alert("Geçerli bir miktar gir!");

  const btcNeeded = amount / btcRate;
  if (btcNeeded > user.btc) return alert("Yetersiz BTC!");

  user.btc -= btcNeeded;
  user.balance += amount;
  updateUI();
}