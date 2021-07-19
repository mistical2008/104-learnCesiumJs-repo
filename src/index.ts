// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = "/public/Cesium/";

import * as Cesium from "cesium";
import { throttle } from "lodash-es";
import "../node_modules/cesium/Build/Cesium/Widgets/widgets.css";
import { config, cities } from "./map-config";
import {
  addMarkersCollection,
  flyToRussia,
  getMapboxTilesUrl,
  addImageryLayersCollection,
  addOnWheel,
  getAngleDiff,
  changeAngleByMove,
  getDistanceDiff,
} from "./tools";

document.addEventListener("DOMContentLoaded", (event) => {
  const toolbarTop: HTMLElement = document.querySelector(".cesium-viewer-toolbar");
  const toolbarBottom: HTMLElement = document.querySelector(".cesium-viewer-bottom");
  // Hide toolbars
  toolbarTop.style.opacity = '0.1';
  toolbarBottom.style.opacity = '0.1';
});

// Your access token can be found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = config.credentials.cesium.ionToken;

// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Cesium.Viewer(config.renderRoot, {
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

scene.screenSpaceCameraController.enableRotate = config.screenSpaceCameraController.enableRotate;
scene.screenSpaceCameraController.enableTranslate = config.screenSpaceCameraController.enableTranslate;
scene.screenSpaceCameraController.enableLook = config.screenSpaceCameraController.enableLook;
scene.screenSpaceCameraController.minimumZoomDistance = config.camera.closeViewMinHeight;
scene.screenSpaceCameraController.maximumZoomDistance = config.screenSpaceCameraController.maximumZoomDistance;
scene.screenSpaceCameraController.enableCollisionDetection = config.screenSpaceCameraController.enableCollisionDetection;

addOnWheel(document.getElementById(config.renderRoot), (event) => {
  throttle(
    () => {
      if (
        viewer.camera.positionCartographic.height < config.camera.closeViewMaxHeight &&
        viewer.camera.positionCartographic.height > config.camera.closeViewMinHeight
      ) {
        const res = changeAngleByMove(
          viewer.camera.positionCartographic.height,
          config.camera.closeViewMinHeight,
          getDistanceDiff(config.camera.closeViewMinHeight, config.camera.closeViewMaxHeight),
          config.camera.closeViewAngle,
          getAngleDiff(
            config.camera.closeViewAngle,
            config.camera.farViewAngle,
          )
        )
        // console.log("Current angle", res, "Current height", viewer.camera.positionCartographic.height);

        viewer.camera.setView({
          orientation: {
            pitch: Cesium.Math.toRadians(res),
            roll: 0.0,
        }})
      } 
    },
    500,
  )()
})

// fn delayedRender: (timeout, callback)
//
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    flyToRussia(scene);
    addMarkersCollection(viewer, cities, true);
  }, 3000);
});

// window.Cesium = Cesium;
// window.layers = layers;
// window.scene = scene;
// window.viewer = viewer;
