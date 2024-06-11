document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.art-image');

    images.forEach(image => {
        const imageId = image.id;
        const blendModeSelect = document.getElementById(`blend-mode-${imageId}`);
        const positionXInput = document.getElementById(`position-x-${imageId}`);
        const positionYInput = document.getElementById(`position-y-${imageId}`);
        const rotateInput = document.getElementById(`rotate-${imageId}`);

        if (blendModeSelect) {
            blendModeSelect.addEventListener('change', (e) => {
                image.style.mixBlendMode = e.target.value;
            });
        }

        if (positionXInput) {
            positionXInput.addEventListener('input', (e) => {
                image.style.left = `${e.target.value}%`;
            });
        }

        if (positionYInput) {
            positionYInput.addEventListener('input', (e) => {
                image.style.top = `${e.target.value}%`;
            });
        }

        if (rotateInput) {
            rotateInput.addEventListener('input', (e) => {
                image.style.transform = `rotate(${e.target.value}deg)`;
            });
        }
    });

    document.getElementById('upload-image').addEventListener('click', function() {
        const fileInput = document.getElementById('image-upload');
        const files = fileInput.files;

        if (files.length === 0) {
            alert('Please select an image to upload.');
            return;
        }

        const file = files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'art-image';
            img.style.position = 'absolute';

            const imageId = `image${document.querySelectorAll('.art-image').length + 1}`;
            img.id = imageId;

            document.getElementById('art-container').appendChild(img);
            addControlsForImage(imageId);
        };

        reader.readAsDataURL(file);
    });

    function addControlsForImage(imageId) {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'control-group';
        controlsContainer.id = `controls-${imageId}`;

        controlsContainer.innerHTML = `
            <h3>Controls for ${imageId}</h3>
            <label for="blend-mode-${imageId}">Blend Mode:</label>
            <select id="blend-mode-${imageId}" class="blend-mode">
                <option value="normal">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
            </select>
            
            <label for="position-x-${imageId}">Position X:</label>
            <input type="range" id="position-x-${imageId}" class="position-x" name="position-x-${imageId}" min="0" max="100">
            
            <label for="position-y-${imageId}">Position Y:</label>
            <input type="range" id="position-y-${imageId}" class="position-y" name="position-y-${imageId}" min="0" max="100">
            
            <label for="rotate-${imageId}">Rotation:</label>
            <input type="range" id="rotate-${imageId}" class="rotate" name="rotate-${imageId}" min="0" max="360" value="0">
        `;

        document.getElementById('controls').appendChild(controlsContainer);

        document.getElementById(`blend-mode-${imageId}`).addEventListener('change', function() {
            document.getElementById(imageId).style.mixBlendMode = this.value;
        });

        document.getElementById(`position-x-${imageId}`).addEventListener('input', function() {
            document.getElementById(imageId).style.left = this.value + '%';
        });

        document.getElementById(`position-y-${imageId}`).addEventListener('input', function() {
            document.getElementById(imageId).style.top = this.value + '%';
        });

        document.getElementById(`rotate-${imageId}`).addEventListener('input', function() {
            document.getElementById(imageId).style.transform = `rotate(${this.value}deg)`;
        });
    }

    function sendEmail() {
        const email = document.getElementById('email').value;
        // Code to capture snapshot and send email
    }

    document.getElementById('send-email').addEventListener('click', sendEmail);
});
document.addEventListener('DOMContentLoaded', () => {
    const artContainer = document.getElementById('art-container');
    const canvas = createCanvas();
    const context = canvas.getContext('2d');

    let isDrawing = false;

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        draw(event.clientX - artContainer.offsetLeft, event.clientY - artContainer.offsetTop);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            draw(event.clientX - artContainer.offsetLeft, event.clientY - artContainer.offsetTop);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    function draw(x, y) {
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
    }

    function createCanvas() {
        const canvas = document.createElement('canvas');
        const artContainer = document.getElementById('art-container');
        canvas.width = artContainer.offsetWidth;
        canvas.height = artContainer.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
        artContainer.appendChild(canvas);
        return canvas;
    }
    
});
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const containerWidth = artContainer.offsetWidth;
    const threshold = containerWidth / 2;

    if (screenWidth < threshold) {
        // Move controls below the container
        controls.style.flexDirection = 'column';
        controls.style.alignItems = 'center';
    } else {
        // Reset controls to default position
        controls.style.flexDirection = 'row';
        controls.style.alignItems = 'flex-start';
    }
});
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const containerWidth = artContainer.offsetWidth;
    const threshold = containerWidth / 2;

    if (screenWidth < threshold) {
        // Move controls below the container
        controls.style.flexDirection = 'column';
        controls.style.alignItems = 'center';
        artContainer.style.zIndex = '2'; // Ensure container is above controls
        images.forEach(image => {
            image.style.zIndex = '2'; // Ensure images are above controls
        });
    } else {
        // Reset controls to default position
        controls.style.flexDirection = 'row';
        controls.style.alignItems = 'flex-start';
        artContainer.style.zIndex = '1'; // Reset container z-index
        images.forEach(image => {
            image.style.zIndex = '1'; // Reset images z-index
        });
    }
});
// Function to handle screen size changes
function handleScreenSizeChange() {
    if (window.innerWidth <= 768) {
        document.querySelector('.controls').style.position = 'fixed';
        document.querySelector('.controls').style.bottom = '100%';
        document.querySelector('.controls').style.width = '100%';
        document.querySelector('.controls').style.zIndex = '1';
        document.querySelector('.art-container').style.marginTop = '0';
    } else {
        document.querySelector('.controls').style.position = 'relative';
        document.querySelector('.controls').style.bottom = 'auto';
        document.querySelector('.controls').style.width = 'auto';
        document.querySelector('.controls').style.zIndex = 'auto';
        document.querySelector('.art-container').style.marginTop = '60px'; // Adjust as needed
    }
}

// Call the function initially
handleScreenSizeChange();

// Listen for screen size changes
window.addEventListener('resize', handleScreenSizeChange);
// Example code for creating a new grid item for an uploaded image
var newGridItem = document.createElement("div");
newGridItem.classList.add("new-grid-item"); // Add the new CSS class
newGridItem.innerHTML = "Content"; // Add content or controls for the uploaded image
// Append the new grid item to the grid container
document.querySelector(".grid-container").appendChild(newGridItem);
// Select all images within the art container
const images = document.querySelectorAll('.art-image');

// Function to generate a random rotation value
function getRandomRotation() {
  return Math.floor(Math.random() * 360); // Generates a random angle between 0 and 360 degrees
}

// Loop through each image and apply a random rotation
images.forEach(image => {
  const rotation = getRandomRotation();
  image.style.transform = `rotate(${rotation}deg)`; // Apply the rotation to the image
});
