import { Canvas } from "@react-three/fiber";
import Odessey from "./canvas";
import Post from "./post";

export default () => (
	<Canvas className="d3" style={{ zIndex: 1 }}>
		<Odessey />
		<Post />
	</Canvas>
);
