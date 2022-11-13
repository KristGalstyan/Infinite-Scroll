const imageContainer = document.querySelector('#image-container'),
      loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'YtlGPQQzEhlStho_EzzUkkDTDG-tpKB6gsxjxwKJ_wY';
let apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        count = 30;
    }
}

// Helper Function to Set Attr. on DOM Elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item , {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each of them finished downloading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    if (window.scrollY + doc.clientHeight >= doc.scrollHeight - 15 &&  ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();