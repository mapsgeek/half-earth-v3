import {
  MASK_LAYER,
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER
} from 'constants/layers-slugs';


export default {
  activeLayers: [
    { title: MASK_LAYER },
    { title: GRAPHIC_LAYER },
    { title: CITIES_LABELS_LAYER },
    { title: COUNTRIES_LABELS_FEATURE_LAYER },
    { title: LANDSCAPE_FEATURES_LABELS_LAYER }
  ],
  padding: {
    bottom: 60,
    left: 300
  },
  isGlobeUpdating: false,
  environment: {
    background: {
      type: 'color',
      color: [0, 0, 0, 0]
    },
    starsEnabled: false,
    atmosphereEnabled: false
  },
  ui: {
    components: []
  },
  constraints: {
    tilt: {
      max: 60
    }
  }
};