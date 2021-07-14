import * as cesium from "cesium";
import { City } from "./tools";

const Cesium: any = cesium;
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
    projectionPicker: false,
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
    // flyToPosition: [97.563399982653785, 43.6738737958489, 1900000.0],
    // flyToPosition: [63.41411432563399, 31.50983281565378, 2900000.0],
    flyToPosition: [65.98071597333362, 38.187637503602346, 3300000.0],
  },
};

const cities: City[] = [
  {
    name: "Арсеньев",
    position: new Cesium.Cartesian3.fromDegrees(
    133.2645474,
		44.1580429)
  },
  {
    name: "Архангельск",
    position: new Cesium.Cartesian3.fromDegrees(
    40.5505769,
		64.5458549)
  },
  {
    name: "Белгород",
    position: new Cesium.Cartesian3.fromDegrees(
    36.5982621,
		50.5997134)
  },
  {
    name: "Биробиджан",
    position: new Cesium.Cartesian3.fromDegrees(
    132.9306664,
		48.7879712)
  },
  {
    name: "Благовещенкск",
    position: new Cesium.Cartesian3.fromDegrees(
    127.5356153,
		50.2660067)
  },
  {
    name: "Брянск",
    position: new Cesium.Cartesian3.fromDegrees(
    34.41611,
		53.2635306)
  },
  {
    name: "Владивосток",
    position: new Cesium.Cartesian3.fromDegrees(
    131.9112975,
		43.1332484)
  },
  {
    name: "Волгоград",
    position: new Cesium.Cartesian3.fromDegrees(
    44.5133035,
		48.708048)
  },
  {
    name: "Вологда",
    position: new Cesium.Cartesian3.fromDegrees(
    39.8978053,
		59.2180665)
  },
  {
    name: "Воронеж",
    position: new Cesium.Cartesian3.fromDegrees(
    39.1919288,
		51.6683487)
  },
  {
    name: "Дзержинск",
    position: new Cesium.Cartesian3.fromDegrees(
    43.4596172,
		56.2374473)
  },
  {
    name: "Екатеринбург",
    position: new Cesium.Cartesian3.fromDegrees(
    60.6454086,
		56.8430993)
  },
  {
    name: "Иваново",
    position: new Cesium.Cartesian3.fromDegrees(
    40.9766453,
		57.0050671)
  },
  {
    name: "Казань",
    position: new Cesium.Cartesian3.fromDegrees(
    49.1233294,
		55.7878944)
  },
  {
    name: "Калининград",
    position: new Cesium.Cartesian3.fromDegrees(
    20.4522144,
		54.7104264)
  },
  {
    name: "Калуга",
    position: new Cesium.Cartesian3.fromDegrees(
    36.2636786,
		54.5135904)
  },
  {
    name: "Королев",
    position: new Cesium.Cartesian3.fromDegrees(
    37.8518552,
		55.9316797)
  },
  {
    name: "Краснодар",
    position: new Cesium.Cartesian3.fromDegrees(
    38.9745706,
		45.036035)
  },
  {
    name: "Красноярск",
    position: new Cesium.Cartesian3.fromDegrees(
    92.8932476,
		56.0152834)
  },
  {
    name: "Курган",
    position: new Cesium.Cartesian3.fromDegrees(
    65.3493207,
		55.4590496)
  },
  {
    name: "Кызыл",
    position: new Cesium.Cartesian3.fromDegrees(
    94.4574804,
		51.7150832)
  },
  {
    name: "Липецк",
    position: new Cesium.Cartesian3.fromDegrees(
    39.5981225,
		52.6121996)
  },
  {
    name: "Москва",
    position: new Cesium.Cartesian3.fromDegrees(
    37.6172999,
		55.755826)
  },
  {
    name: "Находка",
    position: new Cesium.Cartesian3.fromDegrees(
    132.9179224,
		42.8438792)
  },
  {
    name: "Нижний Новогород",
    position: new Cesium.Cartesian3.fromDegrees(
    44.0058793,
		56.3268684)
  },
  {
    name: "Нижний Тагил",
    position: new Cesium.Cartesian3.fromDegrees(
    59.9816185,
		57.9214912)
  },
  {
    name: "Новороссийск",
    position: new Cesium.Cartesian3.fromDegrees(
    37.7770117,
		44.7180464)
  },
  {
    name: "Омск",
    position: new Cesium.Cartesian3.fromDegrees(
    73.3645204,
		54.9913545)
  },
  {
    name: "о. Кунашир",
    position: new Cesium.Cartesian3.fromDegrees(
    145.8335699,
		44.0957852)
  },
  {
    name: "Пермь",
    position: new Cesium.Cartesian3.fromDegrees(
    56.2269674,
		58.0091683)
  },
  {
    name: "Петрозаводск",
    position: new Cesium.Cartesian3.fromDegrees(
    34.3640395,
		61.7781617)
  },
  {
    name: "Псков",
    position: new Cesium.Cartesian3.fromDegrees(
    28.3344735,
		57.8166994)
  },
  {
    name: "Ростов-на-дону",
    position: new Cesium.Cartesian3.fromDegrees(
    39.701505,
		47.2357137)
  },
  {
    name: "Рязань",
    position: new Cesium.Cartesian3.fromDegrees(
    39.7125857,
		54.6095418)
  },
  {
    name: "Самара",
    position: new Cesium.Cartesian3.fromDegrees(
    50.1606382,
		53.203772)
  },
  {
    name: "Санкт-Петербург",
    position: new Cesium.Cartesian3.fromDegrees(
    30.3609096,
		59.9310584)
  },
  {
    name: "Севастополь",
    position: new Cesium.Cartesian3.fromDegrees(
    33.5253671,
		44.61665)
  },
  {
    name: "Симферополь",
    position: new Cesium.Cartesian3.fromDegrees(
    34.102417,
		44.952117)
  },
  {
    name: "Смоленск",
    position: new Cesium.Cartesian3.fromDegrees(
    32.0503663,
		54.7903112)
  },
  {
    name: "Сочи",
    position: new Cesium.Cartesian3.fromDegrees(
    39.7341543,
		43.6028079)
  },
  {
    name: "Тверь",
    position: new Cesium.Cartesian3.fromDegrees(
    35.9175965,
		56.8587214)
  },
  {
    name: "Тула",
    position: new Cesium.Cartesian3.fromDegrees(
    37.6184915,
		54.204836)
  },
  {
    name: "Тюмень",
    position: new Cesium.Cartesian3.fromDegrees(
    65.5618637,
		57.1553394)
  },
  {
    name: "Уссурийск",
    position: new Cesium.Cartesian3.fromDegrees(
    131.9404906,
		43.8015045)
  },
  {
    name: "Уфа",
    position: new Cesium.Cartesian3.fromDegrees(
    55.9578555,
		54.734791)
  },
  {
    name: "Хабаровск",
    position: new Cesium.Cartesian3.fromDegrees(
    135.0720666,
		48.4814433)
  },
  {
    name: "Челябинск",
    position: new Cesium.Cartesian3.fromDegrees(
    61.4368432,
		55.1644419)
  },
];


type MapboxCredentials = typeof config.credentials.mapbox;

export { config, cities, MapboxCredentials };
