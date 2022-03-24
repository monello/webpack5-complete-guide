// Thanks to WebPack 5 we can now import images like we would JS files
import Island from './island.jpg';
import AltText from './altText.txt';

function addImage() {
    // Create the image DOM object
    const img = document.createElement('img');
    img.alt = AltText;
    img.width = 500;
    img.src = Island; // You can assign the imported image directly to the img.src

    // Find the document body and inject the image
    const body = document.querySelector('body');
    body.insertAdjacentElement('beforeend', img);
}

export default addImage;
