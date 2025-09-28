//your code here
const imagesContainer = document.getElementById('images');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('message');

let selected = [];

// Image classes
const imgClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];

// Function to shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize images
function init() {
  selected = [];
  message.textContent = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  imagesContainer.innerHTML = '';

  // Random duplicate
  const duplicateIndex = Math.floor(Math.random() * imgClasses.length);
  const images = [...imgClasses];
  images.push(imgClasses[duplicateIndex]); // add duplicate
  const shuffled = shuffle(images);

  // Create image elements
  shuffled.forEach((cls, idx) => {
    const img = document.createElement('img');
    img.className = cls;
    img.dataset.id = cls; // store id to compare
    img.addEventListener('click', handleClick);
    imagesContainer.appendChild(img);
  });
}

// Handle image click
function handleClick(e) {
  const img = e.target;

  if (!img.classList.contains('selected') && selected.length < 2) {
    img.classList.add('selected');
    selected.push(img);
  } else if (img.classList.contains('selected')) {
    img.classList.remove('selected');
    selected = selected.filter(i => i !== img);
  }

  // Show Reset button
  resetBtn.style.display = selected.length > 0 ? 'inline-block' : 'none';

  // Show Verify button only if two selected
  verifyBtn.style.display = selected.length === 2 ? 'inline-block' : 'none';
}

// Reset functionality
resetBtn.addEventListener('click', () => {
  selected.forEach(img => img.classList.remove('selected'));
  selected = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
});

// Verify functionality
verifyBtn.addEventListener('click', () => {
  if (selected.length === 2) {
    if (selected[0].dataset.id === selected[1].dataset.id) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyBtn.style.display = 'none';
  }
});

// Initialize on load
init();
