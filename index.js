const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");
const curColorDisplay = document.getElementById("curColor");

const gridSize = 10;
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

const colors = ["#000000","#FFFFFF","#FF0000","#00FF00","#0000FF",
                "#FFFF00","#FF00FF","#00FFFF","#888888","#FFA500",
                "#964B00","#808000","#008080","#800080","#C0C0C0"];

let selectedColor = colors[0];
curColorDisplay.textContent = selectedColor;

// Paleti oluştur
colors.forEach(color => {
  const d = document.createElement("div");
  d.className = "color";
  d.style.backgroundColor = color;
  d.onclick = () => {
    selectedColor = color;
    curColorDisplay.textContent = color;
    document.querySelectorAll('.color').forEach(c=>c.classList.remove('selected'));
    d.classList.add('selected');
  };
  palette.appendChild(d);
});
document.querySelector(".color").classList.add('selected');

// Kaydedilmiş tuvali yükle
const saved = JSON.parse(localStorage.getItem('rplace')||'{}');
for (const key in saved) {
  const [x,y] = key.split(',').map(Number);
  ctx.fillStyle = saved[key];
  ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
}

// Tuval tıklama olayı
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX-rect.left)/gridSize);
  const y = Math.floor((e.clientY-rect.top)/gridSize);

  ctx.fillStyle = selectedColor;
  ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);

  saved[`${x},${y}`] = selectedColor;
  localStorage.setItem('rplace', JSON.stringify(saved));
});
