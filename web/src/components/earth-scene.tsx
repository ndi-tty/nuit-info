import React from "react";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";

export const EarthScene: React.FC = () => {
  const spline = useRef();


    function onLoad(splineApp: any) {
        // save the app in a ref for later use
        spline.current = splineApp; 
      }

  return (
    <div style={{ height: "100%" }}>
      <Spline
        scene="https://prod.spline.design/VNrzxGNkm-IEv1K3/scene.splinecode"
        onLoad={onLoad}
        style={{ transform: "scale(1)", zIndex: -10 }}
      />
    </div>
  );
};
