import { Canvas } from "@react-three/fiber";
import MyComponent from "./canvas";
import Post from "./post";

export default () => (
    <>
        <Canvas className="d3" style={{ zIndex: 1 }} gl={{ localClippingEnabled: true }}>
            <MyComponent></MyComponent>
            <Post />
        </Canvas>
    </>
);
