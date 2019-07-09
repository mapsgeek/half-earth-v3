// const WDPA_LAYER_ID = '16b1ef00cbb-layer-1'; // group of two layers id
//production layer
// const WDPA_VECTORTILE_LAYER_ID = '16b1eefb97a-layer-0'; // for global view use

// development layer
const WDPA_VECTORTILE_LAYER_ID = '16bd0dc8ca2-layer-6'; // for global view use
// const WDPA_FEATURE_LAYER_ID = '16b1ef7a1e4-layer-8' // for landscape mode

// const COMMUNITY_LAYER_ID = '16b1ef1807b-layer-5'; // group
// const COMMUNITY_FEATURE_LAYER_ID = '16b1ef114e7-layer-3'; // for global view
//production layer
//const COMMUNITY_VECTORTILE_LAYER_ID = '16b1ef30af1-layer-6'; // for landscape mode

// development layer
const COMMUNITY_VECTORTILE_LAYER_ID = "16bd0d87cf0-layer-1"; // for landscape mode

export const PROTECTED_AREAS_COLOR = '#FF6C47';
export const COMMUNITY_AREAS_COLOR = '#FCC44A';
export const WDPALayers = [
  { 
    name: 'Protected areas',
    value: 'Protected areas',
    id: WDPA_VECTORTILE_LAYER_ID,
    theme: 'overrideCheckbox-protected-areas',
    slug: 'biosphere-reserves'
  },
  {
    name: 'Community-based',
    value: 'Community areas',
    id: COMMUNITY_VECTORTILE_LAYER_ID,
    theme: 'overrideCheckbox-community-areas',
    slug: 'community-conservation'
  }
]

export const legendConfigs = {
  [COMMUNITY_VECTORTILE_LAYER_ID]: {
    type: "basic",
    items: [
      {
        name: "Community-based",
        color: COMMUNITY_AREAS_COLOR
      }
    ],
    title: "Community-based protected areas",
    slug: "community-conservation"
  },
  [WDPA_VECTORTILE_LAYER_ID]: {
    type: "basic",
    items: [
      {
        name: "Protected Areas",
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: "All protected areas",
    slug: "biosphere-reserves"
  }
}