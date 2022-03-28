// We need to render a different Micro Frontend depending on the curren URL
// - the pathname does not incluse the URL or the port. We only want to know the "path"
const url = window.location.pathname;

// We now render the appropriate Micro Frontend depending on the path in the URL
if (url === '/hello-world-page') {
    // Use dynamic imports to consume exposed modules from a Micro Frontend (Module Federation)

    // "HelloWorldApp"
    // - References the "webpack.[dev|production].config.js" > "plugins" > "ModuleFederationPlugin" > "HelloWorldApp"
    // - This reference tells you exactly on which URL the target App (Micro Frontend) is running
    // "HelloWorldPage"
    // - Reference the "webpack.[dev|production].config.js" of the "HelloWorldApp"
    // - More sepecifically, the "modules" > "ModuleFederationPlugin" > "exposes" object, where the exposed modules are registered
    // - It find the "HelloWorldPage" module (component) key, which point to the location of this "HelloWorldButton" module/component
    import('HelloWorldApp/HelloWorldPage')
        .then(HelloWorldPageModule => {
            // The HelloWorldPage module is exported as a default, so you import it like this
            const HelloWorldPage = HelloWorldPageModule.default;
            // Now we can use it as we use any other module/component (as if it is actually part of the dashboard app)
            // - HelloWorldPage is a class-component to we instantiate it with the "new" keyword
            const helloWorldPage = new HelloWorldPage();
            // Finally we call it's render() method to render the HelloWorldPage (App) inside the dashboard App
            helloWorldPage.render();
        });
} else if (url === '/kiwi-page') {
    // The same for the "Kiwi Page"
    import('KiwiApp/KiwiPage')
        .then(KiwiPageModule => {
            const KiwiPage = KiwiPageModule.default;
            const kiwiPage = new KiwiPage();
            kiwiPage.render();
        });
}

console.log('dashboard');
