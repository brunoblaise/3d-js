import "./styles.css";
import { Canvas, useThree } from "@react-three/fiber";
import {
  CameraControls,
  ContactShadows,
  PerspectiveCamera
} from "@react-three/drei";
import Lights from "./components/Lights";

import { useControls, Leva } from "leva";
import { Suspense, useEffect, useRef } from "react";
import { Model } from "./Car";
import { Primitive } from "./Primitive";
import { Shader } from "./Shader";
import { useOptions } from "./useOptions";
import { Branding } from "./components/Branding";

function Thing() {
  const { Geometry } = useControls({
    Geometry: {
      options: ["gltf", "primitive", "shader"],
      value: "gltf"
    }
  });

  const [{ background, ...opts }, set] = useOptions();
  const controls = useThree((s) => s.controls);
  const ref = useRef();

  useEffect(() => {
    if (controls && ref?.current) {
      const margin = 1;
      controls.fitToBox(ref.current, true, {
        paddingTop: margin,
        paddingLeft: margin,
        paddingBottom: margin,
        paddingRight: margin
      });
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }

    if (Geometry === "gltf") {
      set({
        fillMix: 0.25,
        dash: false,
        squeeze: false,
        thickness: 0.02
      });
    } else {
      set({
        fillMix: 1,
        dash: true,
        squeeze: true,
        thickness: 0.14
      });
    }
  }, [set, controls, Geometry]);

  return (
    <>
      <color args={[background]} attach="background" />

      <group ref={ref}>
        {Geometry === "gltf" ? (
          <Model {...opts} />
        ) : Geometry === "shader" ? (
          <Shader />
        ) : (
          <Primitive {...opts} />
        )}
      </group>
    </>
  );
}

export default function App() {
  return (
    <>
      <Leva />
      <Canvas>
        <CameraControls makeDefault />
        <PerspectiveCamera makeDefault fov={45} />

        <Lights />
        <ContactShadows position-y={-1.5} opacity={0.3} blur={3} />

        <Suspense>
          <Thing />
        </Suspense>
      </Canvas>

      <Branding />
    </>
  );
}
