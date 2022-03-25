import Heading from './components/heading/heading';
import HelloWorldButton from './components/hello-world-button/hello-world-button';
import addImage from './add-image';

const heading = new Heading();
heading.render();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

addImage();
