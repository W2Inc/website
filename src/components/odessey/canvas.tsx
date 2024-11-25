import { useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { MeshBasicMaterial, MirroredRepeatWrapping, PlaneGeometry, Texture } from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils.js';

const Odessey = () => {
    const warpTexture = useTexture("./odessey.jpg");
    const [clonedTexture, setClonedTexture] = useState<Texture | undefined>(undefined);

    warpTexture.colorSpace = 'srgb';
    warpTexture.wrapS = MirroredRepeatWrapping;
    warpTexture.wrapT = MirroredRepeatWrapping;
    useEffect(() => {
        const cloned = warpTexture.clone();
        cloned.colorSpace = 'srgb';
        cloned.wrapS = MirroredRepeatWrapping;
        cloned.wrapT = MirroredRepeatWrapping;
        setClonedTexture(cloned);
    }, [warpTexture]);


    useFrame((_, delta) => {
        const speed = 0.06;
        if (warpTexture) warpTexture.offset.x += speed * delta;
        if (clonedTexture) clonedTexture.offset.x += speed * delta;
    });

    const heightIterations = 5;
    const height = 40;
    const offset = 0.2;
    const gap = 4.5;
    const rotationInDegrees = 85;

    const geometry = useMemo(() => {
        const geom = new PlaneGeometry(100, height);
        if (geom.attributes.uv) {
          geom.attributes.uv.array[2] = 0.125;
          geom.attributes.uv.array[6] = 0.125;
          geom.attributes.uv.needsUpdate = true;
        }
        return geom;
      }, [height]);

    const rightMaterial = useMemo(() => {
        return new MeshBasicMaterial({
            map: warpTexture,
            transparent: true
        });
      }, [warpTexture]);

        const leftMaterial = useMemo(() => {
            return new MeshBasicMaterial({
                map: clonedTexture,
                transparent: true
            });
        }, [clonedTexture]);

  if (!warpTexture || !clonedTexture) return null;

  const renderMeshes = (isLeft: boolean) =>
    Array.from({ length: heightIterations }).map((_, i) => {
      const isOdd = i % 2 === 0;
      const positionX = isLeft ? -gap + offset : gap - offset;
      const rotationY = isLeft ? rotationInDegrees * DEG2RAD : -rotationInDegrees * DEG2RAD;
      const material = isLeft ? leftMaterial : rightMaterial;

      return (
        <mesh
          key={`${isLeft ? 'left' : 'right'}-${i}`}
          position={[positionX, height * i, 0]}
          rotation-y={rotationY}
          scale-y={isOdd ? -1 : 1}
          scale-x={isLeft ? 1 : -1}
        >
          <primitive object={geometry} />
          <primitive object={material} />
        </mesh>
      );
    });

  return (
    <>
      <color attach="background" args={['black']} />
      <group>
        {renderMeshes(true)}
        {renderMeshes(false)}
      </group>
    </>
  );
};

export default Odessey;
