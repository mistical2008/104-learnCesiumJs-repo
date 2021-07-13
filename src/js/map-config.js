const config = {
  renderRoot: "cesiumContainer",
  credentials: {
    mapbox: {
      username: "andrew2141441",
      token:
        "pk.eyJ1IjoiYW5kcmV3MjE0MTQ0MSIsImEiOiJja2x0Y2h5b2cyNWVhMm9uMTY4d2dranoxIn0.J61t4-R9Qp2YkeR566otDw",
      style: "cknejxpqx35ma17peq9w7d5y8",
    },
    cesium: {
      // Your access token can be found at: https://cesium.com/ion/tokens.
      ionToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMmFhOTk3YS00ZWM2LTRkM2UtOWYzMS1mZWM3ZDRlZDcxZDciLCJpZCI6NjExNzUsImlhdCI6MTYyNTc0NjU2MH0.YDBEGFB3mSyXfMQRK0gLTrkVr08NGgxdKtXvz2Zg4JU",
    },
  },
  toolbarControls: {
    geocoder: false,
    homeButton: false,
    infoBox: false,
    baseLayerPicker: false,
    animation: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    timeline: false,
    fullscreenButton: false,
    selectionIndicator: false,
  },
  screenSpaceCameraController: {
    enableRotate: true,
    enableTranslate: false,
    enableLook: true,
    minimumZoomDistance: 2000000,
    maximumZoomDistance: 65000000,
    enableCollisionDetection: true,
  },
  camera: {
    flyToPosition: [97.563399982653785, 43.6738737958489, 1900000.0],
  },

};

function getMapboxTilesUrl(mapboxCredentials) {
  const { username, token, style } = mapboxCredentials;
  return `https://api.mapbox.com/styles/v1/${username}/${style}/tiles/256/{z}/{x}/{y}?access_token=${token}`;
}

export { config, getMapboxTilesUrl };
