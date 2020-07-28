import {
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  ALL_TAXA_RARITY,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_MASK_LAYER
} from 'constants/layers-slugs';

import { DEFAULT_OPACITY, LAYERS_CATEGORIES } from 'constants/mol-layers-configs'


export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: COUNTRY_MASK_LAYER },
      { title: FIREFLY_BASEMAP_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: MERGED_WDPA_VECTOR_TILE_LAYER },
      { title: ALL_TAXA_RARITY, opacity: DEFAULT_OPACITY, category: LAYERS_CATEGORIES.BIODIVERSITY }
    ],
    zoom: 1,
    center: [16.9515536, 0.116959],
    padding: {
      bottom: 60
    },
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: "color",
        color: [0,10,16]
      },
      alphaCompositingEnabled: true
    },
    constraints: {
      altitude: {
        max: 35512548,
        min: 10000
      }
    },
    ui: {
      components: []
    },
  },
  ui: {
    isSidebarOpen: false,
    activeOption: 'add_layer', // mobile
    isFullscreenActive: false, 
    activeCategory: '',
    sceneMode: 'global'
  },
  listeners: false
}