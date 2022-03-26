import Heading from "./components/heading/heading";
import IslandImage from "./components/island-image/island-image";
import _ from "lodash";

const heading = new Heading();
heading.render(_.join(['island', 'image'], '-'));

const island = new IslandImage();
island.render();

