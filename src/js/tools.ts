import * as Cesium from "cesium";
import { config, MapboxCredentials } from "./map-config";

function flyToRussia(scene: Cesium.Scene): void {
    const destination: Cesium.Cartesian3 = new Cesium.Cartesian3.fromDegrees(
      ...config.camera.flyToPosition
    );
  scene.camera.flyTo({
    destination,
    orientation: {
      pitch: Cesium.Math.toRadians(-59), // default value (looking down)
      roll: 0.0,
    },
  });
}

type Marker = {
  name: string,
  position: Cesium.Cartesian3,
  pixelSize?: number,
  billboard?: Cesium.Billboard,
  font?: string,
  color?: Cesium.Color | undefined,
  // color?: string | "",
  labelStyle?: Cesium.LabelStyle,
  outlineWidth?: number,
  labelOutlineWidth?: number,
  labelOulineColor?: Cesium.Color | undefined,
  outlineColor?: Cesium.Color,
  labelPixelOffset?: Cesium.Cartesian2,
  labelOutlineColor?: Cesium.Color,
  labelScale?: number,
  labelHorizontalOrigin?: Cesium.HorizontalOrigin,
  labelVerticalOrigin?: Cesium.VerticalOrigin,
  translucencyByDistance?: Cesium.NearFarScalar,
}

function addMarker(viewer: Cesium.Viewer, {
  name,
  position,
  pixelSize = 18,
  billboard,
  font = '1.7em Helvetica, Arial, sans-serif',
  color = Cesium.Color.BLACK,
  labelStyle = Cesium.LabelStyle.FILL,
  labelOutlineColor = Cesium.Color.BLACK,
  outlineWidth = 2,
  labelOutlineWidth = 1,
  outlineColor = Cesium.Color.WHITE,
  labelVerticalOrigin = Cesium.VerticalOrigin.TOP,
  labelPixelOffset = new Cesium.Cartesian2(10, -40),
  labelScale = 1.0,
  labelHorizontalOrigin = Cesium.HorizontalOrigin.LEFT,
  translucencyByDistance = new Cesium.NearFarScalar(5.0e6, 1.0, 20.0e6, 0.0),

}: Marker) {
  viewer.entities.add({
    name,
    position,
    billboard,
    point: {
      pixelSize,
      color,
      outlineColor: outlineColor,
      outlineWidth,
      translucencyByDistance,
    },
    label: {
      text: name,
      font,
      style: labelStyle,
      outlineColor: labelOutlineColor,
      outlineWidth: labelOutlineWidth,
      verticalOrigin: labelVerticalOrigin,
      pixelOffset: labelPixelOffset,
      scale: labelScale,
      horizontalOrigin: labelHorizontalOrigin,
      translucencyByDistance,
    }
  })
}

type City = {
  name: string,
  position: Cesium.Cartesian3,
  billboard?: Cesium.Billboard,
}
function addCity(viewer: Cesium.Viewer, { name, position, billboard }: City) {
  return addMarker(viewer, {
    name,
    position,
    pixelSize: 18,
    billboard,
    font: '1.7em Helvetica, Arial, sans-serif',
    outlineWidth: 4,
    labelOutlineWidth: 2,
    // labelOutlineColor: Cesium.Color.BLUE,
    labelStyle: Cesium.LabelStyle.FILL_AND_OUTLINE,
    labelPixelOffset: new Cesium.Cartesian2(10, -40),
  })
}

function addMarkersCollection (viewer: Cesium.Viewer, markers: Marker[], isCity = false) {
  markers.forEach(marker => {
    if (isCity) {
      addCity(viewer, marker)
    } else {
      addMarker(viewer, marker)
    }
  })
}

function getMapboxTilesUrl(mapboxCredentials: MapboxCredentials) {
  const { username, token, style } = mapboxCredentials;
  return `https://api.mapbox.com/styles/v1/${username}/${style}/tiles/256/{z}/{x}/{y}?access_token=${token}`;
}

type ImageryLayerSetup = Pick<Cesium.ImageryLayer, "alpha"| "hue"| "saturation"| "brightness">;

function addImageryLayer(layers: Cesium.ImageryLayerCollection, provider: Cesium.ImageryProvider, options: ImageryLayerSetup) {
  const layer: Cesium.ImageryLayer = layers.addImageryProvider(provider);
  Object.keys(options).forEach((option: keyof ImageryLayerSetup) => {
    if (layer[option] !== undefined) {
      layer[option] = options[option]
    }
  })
}

export { flyToRussia, addMarker, addMarkersCollection, getMapboxTilesUrl, addImageryLayer, City };
