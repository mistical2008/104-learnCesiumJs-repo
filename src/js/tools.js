import * as Cesium from "cesium";
import { config } from "./map-config";

function flyToRussia(scene) {
  scene.camera.flyTo({
    destination: new Cesium.Cartesian3.fromDegrees(
      ...config.camera.flyToPosition
    ),
    orientation: {
      pitch: Cesium.Math.toRadians(-44), // default value (looking down)
      roll: 0.0,
    },
  });
}

export { flyToRussia };
