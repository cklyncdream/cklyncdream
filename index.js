const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");
const coordDisplay = document.getElementById("coord");

const gridSize = 10;
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

const colors = [
  "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
  "#ffff00", "#00ffff", "#ff00ff", "#888888", "#ffa500",
  "#964B00", "#808000", "#008080", "#800080", "#c0c0c0"
];

let selectedColor = colors[0];

// Load saved pixels
const pixelMap = JSON.parse(localStorage.getItem("pixelMap") || "[]");
pixelMap.forEach(p => {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x * gridSize, p.y * gridSize, gridSize, gridSize);
});

// Palette setup
colors.forEach(color => {
  const div = document.createElement("div");
  div.className = "color";
  div.style.backgroundColor = color;
  div.onclick = () => {
    selectedColor = color;
    document.querySelectorAll(".color").forEach(c => c.classList.remove("selected"));
    div.classList.add("selected");
  };
  palette.appendChild(div);
});
document.querySelector(".color").classList.add("selected");

// Draw pixel
canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / gridSize);
  const y = Math.floor((e.clientY - rect.top) / gridSize);

  ctx.fillStyle = selectedColor;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);

  savePixel(x, y, selectedColor);
});

// Show coordinates
canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / gridSize);
  const y = Math.floor((e.clientY - rect.top) / gridSize);
  coordDisplay.textContent = `X: ${x}, Y: ${y}`;
});

// Save pixel to localStorage
function savePixel(x, y, color) {
  let pixelMap = JSON.parse(localStorage.getItem("pixelMap") || "[]");
  pixelMap = pixelMap.filter(p => !(p.x === x && p.y === y)); // overwrite
  pixelMap.push({ x, y, color });
  localStorage.setItem("pixelMap", JSON.stringify(pixelMap));
}
