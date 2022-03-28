// Instead of re-coding all the code that exists in the kiw-page component, we can just import the page here
// DRY
import KiwiPage from "./components/kiwi-page/kiwi-page";

const kiwiPage = new KiwiPage();
kiwiPage.render();
