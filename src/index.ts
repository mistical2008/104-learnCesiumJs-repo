// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = "/public/Cesium/";

import * as Cesium from "cesium";
import { throttle } from "lodash-es";
import "../node_modules/cesium/Build/Cesium/Widgets/widgets.css";
import { config, cities } from "./js/map-config";
import {
  addMarkersCollection,
  flyToRussia,
  getMapboxTilesUrl,
  addImageryLayersCollection,
  addOnWheel,
} from "./js/tools";

document.addEventListener("DOMContentLoaded", (event) => {
  const toolbarTop = document.querySelector(".cesium-viewer-toolbar");
  const toolbarBottom = document.querySelector(".cesium-viewer-bottom");
  // Hide toolbars
  toolbarTop.style.opacity = 0.3;
  toolbarBottom.style.opacity = 0.3;
});

// Your access token can be found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = config.credentials.cesium.ionToken;

// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  ...config.toolbarControls,
  imageryProvider: Cesium.createWorldImagery({
    style: Cesium.IonWorldImageryStyle.AERIAL,
  }),
});
const scene = viewer.scene;
const layers = viewer.scene.imageryLayers;

addImageryLayersCollection(layers, [
  {
    provider: new Cesium.UrlTemplateImageryProvider({
      url: getMapboxTilesUrl(config.credentials.mapbox),
      // maximumLevel: 3,
    }),
    renderOptions: {
      alpha: 0.60,
      brightness: 1.5,
    }
  },
  {
    provider: new Cesium.IonImageryProvider({ assetId: 3812 }),
    renderOptions: {
      alpha: 0.4,
      brightness: 1.9,
    }
  },
])

// scene.skyBox.show = false;
const canvas = viewer.canvas;
canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
canvas.onclick = function () {
  canvas.focus();
};

// disable the default event handlers
scene.screenSpaceCameraController.enableRotate = true;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableLook = true;
scene.screenSpaceCameraController.minimumZoomDistance = 1800000;
scene.screenSpaceCameraController.maximumZoomDistance = 65000000;
scene.screenSpaceCameraController.enableCollisionDetection = true;

addOnWheel(document.getElementById("cesiumContainer"), (event) => {
  throttle(
    () => {
      console.log("throttled!") 
    },
    500,
  )
})

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    flyToRussia(scene);
    addMarkersCollection(viewer, cities, true);
  }, 3000);
});

window.Cesium = Cesium;
window.layers = layers;
window.scene = scene;
window.viewer = viewer;
