const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");

const gridSize = 10; // Her piksel 10x10 görünsün
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

const colors = [
  "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
  "#ffff00", "#00ffff", "#ff00ff", "#888888", "#ffa500"
];

let selectedColor = colors[0];

// Paleti oluştur
colors.forEach(color => {
  const colorDiv = document.createElement("div");
  colorDiv.className = "color";
  colorDiv.style.backgroundColor = color;
  colorDiv.onclick = () => {
    selectedColor = color;
    document.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
    colorDiv.classList.add('selected');
  };
  palette.appendChild(colorDiv);
});
document.querySelector('.color').classList.add('selected');

// Tuvale tıklanınca boya
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / gridSize);
  const y = Math.floor((e.clientY - rect.top) / gridSize);

  ctx.fillStyle = selectedColor;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
});
