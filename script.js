//your code here
const heading = document.getElementById("h");
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");


const images = [
  "https://picsum.photos/100?1",
  "https://picsum.photos/100?2",
  "https://picsum.photos/100?3",
  "https://picsum.photos/100?4",
  "https://picsum.photos/100?5",
]

const duplicateIndex = Math.floor(Math.random() * images.length);
const duplicateImage = images[duplicateIndex];

const allImages = [...images, duplicateImage];

allImages.sort(() => Math.random() - 0.5);

let selected = [];

allImages.forEach((src, index) => {
  const img = document.createElement("img");
  
  img.src = src;
  img.dataset.image = src;
  img.width = 100;
  img.height = 100;
  img.style.margin = "10px";
  img.style.cursor = "pointer";
  
  container.appendChild(img);
  
  img.addEventListener("click", () => {
    if(selected.includes(img)) return;
    
    if(selected.length >= 2) return;
    selected.push(img);
    
    img.classList.add("selected");
    resetBtn.style.display = "inline-block";
    
    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  });
});

resetBtn.addEventListener("click", () => {
  selected.forEach((img) => {
    img.classList.remove("selected");
  });
  
  selected = [];
  
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  para.textContent = "";
  
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot";
});


verifyBtn.addEventListener("click", () => {
  const first = selected[0].dataset.image;
  const second = selected[1].dataset.image;
  
  if (first === second) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  
  verifyBtn.style.display = "none";
})
