const { data: sampleListings } = require('../init/data');

// Function to render listings
function renderListings() {
  const listingsContainer = document.getElementById('listings-container');
  listingsContainer.innerHTML = '';

  sampleListings.forEach(listing => {
    const listingElement = document.createElement('div');
    listingElement.className = 'listing';

    const imageElement = document.createElement('img');
    imageElement.src = listing.image.url; // Use the image URL from the database
    imageElement.alt = listing.title;

    const titleElement = document.createElement('h2');
    titleElement.textContent = listing.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = listing.description;

    listingElement.appendChild(imageElement);
    listingElement.appendChild(titleElement);
    listingElement.appendChild(descriptionElement);

    listingsContainer.appendChild(listingElement);
  });
}

// Call the render function to display listings
renderListings();
