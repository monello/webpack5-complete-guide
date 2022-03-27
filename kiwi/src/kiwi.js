import Heading from './components/heading/heading.js';
import KiwiImage from './components/kiwi-image/kiwi-image.js';

const heading = new Heading();
heading.render('kiwi');
const kiwiImage = new KiwiImage();
kiwiImage.render();

// modules/components being consumed from another app (Module Federation), needs to be imported Asynchronously
// * HelloWorldApp = References the App name we set in the ModuleFederationPlugin in the Webpack Config or the Hello World Application.
//      This app name also has to be listed as a remote in the remotes property of the ModuleFederationPlugin config of this app (kiwi)'s Webpack Config
// * HelloWorldButton = References one of the modules listed in the "exposes" property of the ModuleFederationPlugin setting, of the Webpack config of the remote app
import('HelloWorldApp/HelloWorldButton')
    .then(HelloWorldButtonModule => {
        // In the remote application, in the HelloWorldButton component/module the funcionality is exported as a default
        const HelloWorldButton = HelloWorldButtonModule.default;
        // Now we can use this component as if it is defined in this application
        const helloWorldButton = new HelloWorldButton();
        helloWorldButton.render();
    });
