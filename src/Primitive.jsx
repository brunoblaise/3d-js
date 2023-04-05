import { Icosahedron, Wireframe, Float } from "@react-three/drei";
import { useLayoutEffect, useState } from "react";
import { MeshPhongMaterial } from "three";

export function Primitive(opts) {
  return (
    <>
      <Float floatIntensity={4} rotationIntensity={4}>
        <Icosahedron args={[1, 1]}>
          <meshPhongMaterial flatShading color="tomato" shininess={1} />

          <Wireframe {...opts} />
        </Icosahedron>
      </Float>
    </>
  );
}
