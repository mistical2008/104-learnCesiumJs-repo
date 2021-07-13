// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = "/public/Cesium/";

import * as Cesium from "cesium";
// import './index.css'
// import "cesium/Build/Cesium/Widgets/widgets.css";
window.Cesium = Cesium;
const initialPosition = [40.72884840357047, -74.04739001253934, 37000000.0];
const flyToPosition = [63.563399982653785, 53.6738737958489, 3700000.0];

document.addEventListener("DOMContentLoaded", (event) => {
  const toolbarTop = document.querySelector(".cesium-viewer-toolbar");
  const toolbarBottom = document.querySelector(".cesium-viewer-bottom");
  // Hide toolbars
  // toolbarTop.style.display = "none";
  toolbarBottom.style.display = "none";
});

var MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYW5kcmV3MjE0MTQ0MSIsImEiOiJja2x0Y2h5b2cyNWVhMm9uMTY4d2dranoxIn0.J61t4-R9Qp2YkeR566otDw";
var MAPBOX_STYLE_ID = "cknejxpqx35ma17peq9w7d5y8";
var MAPBOX_USERNAME = "andrew2141441";
var defaultMap =
  "https://api.mapbox.com/styles/v1/" +
  MAPBOX_USERNAME +
  "/" +
  MAPBOX_STYLE_ID +
  "/tiles/256/{z}/{x}/{y}?access_token=" +
  MAPBOX_ACCESS_TOKEN;

// Your access token can be found at: https://cesium.com/ion/tokens.
// Replace `your_access_token` with your Cesium ion access token.
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMmFhOTk3YS00ZWM2LTRkM2UtOWYzMS1mZWM3ZDRlZDcxZDciLCJpZCI6NjExNzUsImlhdCI6MTYyNTc0NjU2MH0.YDBEGFB3mSyXfMQRK0gLTrkVr08NGgxdKtXvz2Zg4JU";

// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  geocoder: false,
  homeButton: false,
  infoBox: false,
  fullscreenButton: false,
  baseLayerPicker: false,
  animation: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  timeline: false,
  FullscreenButton: false,
  selectionIndicator: false,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: defaultMap,
    defaultAlpha: 0.7,
    defaultDayAlpha: 0.5,
    maximumLevel: 3,
  }),
});
const scene = viewer.scene;
// const camera = viewer.camera;
const camera = new Cesium.Camera(scene);
const layers = viewer.scene.imageryLayers;
const blackMarble = layers.addImageryProvider(
  new Cesium.IonImageryProvider({ assetId: 3812 })
);

// blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.
// blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.

camera.position = new Cesium.Cartesian3.fromDegrees(...initialPosition);
camera.direction = Cesium.Cartesian3.negate(
  Cesium.Cartesian3.UNIT_Z,
  new Cesium.Cartesian3()
);
camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y);
camera.frustum.fov = Cesium.Math.PI_OVER_THREE;
camera.frustum.near = 1.0;
camera.frustum.far = 2.0;
// viewer.camera.position = new Cesium.Cartesian3.fromDegrees(longitude, latitude)
// viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 5200000.0));
// camera.flyToBoundingSphere(new Cesium.BoundingSphere(...flyToPosition));
function flyToRussia() {
  scene.camera.flyTo({
    destination: new Cesium.Cartesian3.fromDegrees(...flyToPosition),
    orientation: {
      // direction: new Cesium.Cartesian3(
      // ),
      // up: new Cesium.Cartesian3(
      // ),
      heading: 6.283185307179567,
      pitch: Cesium.Math.toRadians(-60), // default value (looking down)
      roll: 0.0,
    },
  });
}
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => flyToRussia(), 3000);
});

// viewer.camera.rotateDown(Cesium.Math.toRadians(40));

scene.skyBox.show = false;
const canvas = viewer.canvas;
canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
canvas.onclick = function () {
  canvas.focus();
};
const ellipsoid = scene.globe.ellipsoid;

// disable the default event handlers
scene.screenSpaceCameraController.enableRotate = true;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = true;
scene.screenSpaceCameraController.enableTilt = false;
scene.screenSpaceCameraController.enableLook = true;
scene.screenSpaceCameraController.minimumZoomDistance = 2000000;
scene.screenSpaceCameraController.maximumZoomDistance = 65000000;
scene.screenSpaceCameraController.enableCollisionDetection = true;

window.layers = layers;
window.scene = scene;
window.viewer = viewer;
// var startMousePosition;
// var mousePosition;
// var flags = {
// looking: false,
// moveForward: false,
// moveBackward: false,
// moveUp: false,
// moveDown: false,
// moveLeft: false,
// moveRight: false,
// };
//
// var handler = new Cesium.ScreenSpaceEventHandler(canvas);
//
// handler.setInputAction(function (movement) {
// flags.looking = true;
// mousePosition = startMousePosition = Cesium.Cartesian3.clone(
// movement.position
// );
// }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
//
// handler.setInputAction(function (movement) {
// mousePosition = movement.endPosition;
// }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
//
// handler.setInputAction(function (position) {
// flags.looking = false;
// }, Cesium.ScreenSpaceEventType.LEFT_UP);
//
// function getFlagForKeyCode(keyCode) {
// switch (keyCode) {
// case "W".charCodeAt(0):
// return "moveForward";
// case "S".charCodeAt(0):
// return "moveBackward";
// case "Q".charCodeAt(0):
// return "moveUp";
// case "E".charCodeAt(0):
// return "moveDown";
// case "D".charCodeAt(0):
// return "moveRight";
// case "A".charCodeAt(0):
// return "moveLeft";
// default:
// return undefined;
// }
// }
//
// document.addEventListener(
// "keydown",
// function (e) {
// var flagName = getFlagForKeyCode(e.keyCode);
// if (typeof flagName !== "undefined") {
// flags[flagName] = true;
// }
// },
// false
// );
//
// document.addEventListener(
// "keyup",
// function (e) {
// var flagName = getFlagForKeyCode(e.keyCode);
// if (typeof flagName !== "undefined") {
// flags[flagName] = false;
// }
// },
// false
// );
//
// viewer.clock.onTick.addEventListener(function (clock) {
// var camera = viewer.camera;
//
// if (flags.looking) {
// var width = canvas.clientWidth;
// var height = canvas.clientHeight;
//
// Coordinate (0.0, 0.0) will be where the mouse was clicked.
// var x = (mousePosition.x - startMousePosition.x) / width;
// var y = -(mousePosition.y - startMousePosition.y) / height;
//
// var lookFactor = 0.05;
// camera.lookRight(x * lookFactor);
// camera.lookUp(y * lookFactor);
// }
//
// Change movement speed based on the distance of the camera to the surface of the ellipsoid.
// var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
// var moveRate = cameraHeight / 100.0;
//
// if (flags.moveForward) {
// camera.moveForward(moveRate);
// }
// if (flags.moveBackward) {
// camera.moveBackward(moveRate);
// }
// if (flags.moveUp) {
// camera.moveUp(moveRate);
// }
// if (flags.moveDown) {
// camera.moveDown(moveRate);
// }
// if (flags.moveLeft) {
// camera.moveLeft(moveRate);
// }
// if (flags.moveRight) {
// camera.moveRight(moveRate);
// }
// });
