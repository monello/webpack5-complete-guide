import Island from './island.jpg';
import './island-image.scss';
import AltText from './altText.txt';

class IslandImage {
    render() {
        // Create the image DOM object
        const img = document.createElement('img');
        img.alt = AltText;
        img.src = Island; // You can assign the imported image directly to the img.src
        img.classList.add('island-image');

        // Find the #app element and inject the image
        const body = document.getElementById('app');
        body.insertAdjacentElement('beforeend', img);
    }
}

export default IslandImage;
