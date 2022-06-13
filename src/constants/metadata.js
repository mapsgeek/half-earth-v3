import {
  MERGED_WDPA_VECTOR_TILE_LAYER,
  AMPHIB_RARITY_1KM,
  AMPHIB_RICHNESS_1KM,
  SA_DRAGONFLIES_RARITY,
  SA_DRAGONFLIES_RICHNESS,
  SA_MAMMALS_RARITY,
  SA_MAMMALS_RICHNESS,
  SA_BIRDS_RARITY,
  SA_BIRDS_RICHNESS,
  SA_RESTIO_RARITY,
  SA_RESTIO_RICHNESS,
  SA_PROTEA_RARITY,
  SA_PROTEA_RICHNESS,
  REPTILES_RARITY_1KM,
  REPTILES_RICHNESS_1KM,
  BUTTERFLIES_RARITY_1KM,
  BUTTERFLIES_RICHNESS_1KM,
  HUMMINGBIRDS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  FISHES_RARITY,
  FISHES_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  REPTILES_RICHNESS,
  ANTS_RICHNESS,
  BUTTERFLIES_RICHNESS,
  ODONATES_RICHNESS,
  SAPINDALES_RICHNESS,
  REPTILES_RARITY,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  COUNTRY_PRIORITY_LAYER,
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  MARINE_AND_LAND_HUMAN_PRESSURES,
  ALL_TAXA_PRIORITY,
  MERGED_LAND_HUMAN_PRESSURES,
  HALF_EARTH_FUTURE_METADATA_SLUG,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
  MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER
 } from 'constants/layers-slugs';

export const SPECIES_PROTECTION_INDEX = 'spi-def';
export const CHALLENGES_CHART = 'challenges-plot';
export const RANKING_CHART = 'spi-ranking';
export const MERGED_PROTECTION = MERGED_WDPA_VECTOR_TILE_LAYER;
export const COUNTRY_PRIORITY = COUNTRY_PRIORITY_LAYER;

export {
  ALL_TAXA_PRIORITY,
  MERGED_LAND_HUMAN_PRESSURES,
  HALF_EARTH_FUTURE_TILE_LAYER,
 } from 'constants/layers-slugs';

export default {
  [ALL_TAXA_PRIORITY]: {
    slug: ALL_TAXA_PRIORITY,
    title: 'Biodiversity pattern'
  },
  [MERGED_LAND_HUMAN_PRESSURES]: {
    slug: MERGED_LAND_HUMAN_PRESSURES,
    title: 'Human modifications'
  },
  [CHALLENGES_CHART]: {
    slug: CHALLENGES_CHART,
    title: 'What are the challenges for a country?'
  },
  [RANKING_CHART]: {
    slug: RANKING_CHART,
    title: 'Species Protection Index'
  },
  [MERGED_PROTECTION]: {
    slug: MERGED_PROTECTION,
    title: 'Protected Areas'
  },
  [SPECIES_PROTECTION_INDEX]: {
    slug: SPECIES_PROTECTION_INDEX,
    title: 'Species Protection Index'
  },
  [AMPHIB_RARITY_1KM]: {
    slug: AMPHIB_RARITY_1KM,
    title: 'Amphibian regional rarity'
  },
  [AMPHIB_RICHNESS_1KM]: {
    slug: AMPHIB_RICHNESS_1KM,
    title: 'Amphibian regional richness'
  },
  [SA_DRAGONFLIES_RARITY]: {
    slug: SA_DRAGONFLIES_RARITY,
    title: 'Dragonflies rarity'
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    slug: SA_DRAGONFLIES_RICHNESS,
    title: 'Dragonflies richness'
  },
  [SA_MAMMALS_RARITY]: {
    slug: SA_MAMMALS_RARITY,
    title: 'Mammals regional rarity'
  },
  [SA_MAMMALS_RICHNESS]: {
    slug: SA_MAMMALS_RICHNESS,
    title: 'Mammals regional richness'
  },
  [SA_BIRDS_RARITY]: {
    slug: SA_BIRDS_RARITY,
    title: 'Birds regional rarity'
  },
  [SA_BIRDS_RICHNESS]: {
    slug: SA_BIRDS_RICHNESS,
    title: 'Birds regional richness'
  },
  [SA_RESTIO_RARITY]: {
    slug: SA_RESTIO_RARITY,
    title: 'Restio regional rarity'
  },
  [SA_RESTIO_RICHNESS]: {
    slug: SA_RESTIO_RICHNESS,
    title: 'Restio regional richness'
  },
  [SA_PROTEA_RARITY]: {
    slug: SA_PROTEA_RARITY,
    title: 'Protea regional rarity'
  },
  [SA_PROTEA_RICHNESS]: {
    slug: SA_PROTEA_RICHNESS,
    title: 'Protea regional richness'
  },
  [REPTILES_RARITY_1KM]: {
    slug: REPTILES_RARITY_1KM,
    title: 'Reptiles regional rarity'
  },
  [REPTILES_RICHNESS_1KM]: {
    slug: REPTILES_RICHNESS_1KM,
    title: 'Reptiles regional richness'
  },
  [BUTTERFLIES_RICHNESS_1KM]: {
    slug: BUTTERFLIES_RICHNESS_1KM,
    title: 'Butterflies regional richness'
  },
  [BUTTERFLIES_RARITY_1KM]: {
    slug: BUTTERFLIES_RARITY_1KM,
    title: 'Butterflies regional rarity'
  },
  // Hummingbirds
  [HUMMINGBIRDS_RICHNESS]: {
    slug: HUMMINGBIRDS_RICHNESS,
    title: 'Hummingbirds richness'
  },
  [HUMMINGBIRDS_RARITY]: {
    slug: HUMMINGBIRDS_RARITY,
    title: 'Hummingbirds rarity'
  },
  // Global data
  [MAMMALS_RARITY]: {
    slug: MAMMALS_RARITY,
    title: 'Mammals rarity'
  },
  [MAMMALS_RICHNESS]: {
    slug: MAMMALS_RICHNESS,
    title: 'Mammals richness'
  },
  [FISHES_RARITY]: {
    slug: FISHES_RARITY,
    title: 'Fishes rarity'
  },
  [FISHES_RICHNESS]: {
    slug: FISHES_RICHNESS,
    title: 'Fishes richness'
  },
  [CONIFERS_RARITY]: {
    slug: CONIFERS_RARITY,
    title: 'Conifers rarity'
  },
  [CONIFERS_RICHNESS]: {
    slug: CONIFERS_RICHNESS,
    title: 'Conifers richness'
  },
  [CACTI_RARITY]: {
    slug: CACTI_RARITY,
    title: 'Cacti rarity'
  },
  [CACTI_RICHNESS]: {
    slug: CACTI_RICHNESS,
    title: 'Cacti richness'
  },
  [AMPHIB_RARITY]: {
    slug: AMPHIB_RARITY,
    title: 'Amphibian rarity'
  },
  [AMPHIB_RICHNESS]: {
    slug: AMPHIB_RICHNESS,
    title: 'Amphibian richness'
  },
  [REPTILES_RICHNESS]: {
    slug: REPTILES_RICHNESS,
    title: 'Reptile richness'
  },
  [ANTS_RICHNESS]: {
    slug: ANTS_RICHNESS,
    title: 'Ants richness'
  },
  [BUTTERFLIES_RICHNESS]: {
    slug: BUTTERFLIES_RICHNESS,
    title: 'Butterflies richness'
  },
  [ODONATES_RICHNESS]: {
    slug: ODONATES_RICHNESS,
    title: 'Odonates richness'
  },
  [SAPINDALES_RICHNESS]: {
    slug: SAPINDALES_RICHNESS,
    title: 'Sapindales richness'
  },
  [REPTILES_RARITY]: {
    slug: REPTILES_RARITY,
    title: 'Reptile rarity'
  },
  [BIRDS_RARITY]: {
    slug: BIRDS_RARITY,
    title: 'Birds rarity'
  },
  [BIRDS_RICHNESS]: {
    slug: BIRDS_RICHNESS,
    title: 'Birds richness'
  },
  [ALL_TAXA_RARITY]: {
    slug: ALL_TAXA_RARITY,
    title: 'All groups rarity'
  },
  [ALL_TAXA_RICHNESS]: {
    slug: ALL_TAXA_RICHNESS,
    title: 'All groups richness'
  },
  [COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
    title: 'Protection needed'
  },
  [LAND_COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
    title: 'Land protection needed'
  },
  [MARINE_COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
    title: 'Marine protection needed'
  },
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: 'Community-based protected areas'
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: 'Protected areas'
  },
  [TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: 'Terrestrial protected areas'
  },
  [MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: 'Marine protected areas'
  },
  [MARINE_AND_LAND_HUMAN_PRESSURES]: {
    slug: MARINE_AND_LAND_HUMAN_PRESSURES,
    title: 'Marine and land human pressures'
  },
  [HALF_EARTH_FUTURE_TILE_LAYER]: {
    slug: HALF_EARTH_FUTURE_METADATA_SLUG,
    title: 'Places for a Half-Earth Future'
  },
  [SPECIFIC_REGIONS_TILE_LAYER]: {
    slug: SPECIFIC_REGIONS_TILE_LAYER,
    title: 'Specific regions'
  },
};
