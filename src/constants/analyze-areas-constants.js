import React from 'react';
import {
  WDPA_OECM_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  WDPA_PRECALCULATED_DATA_TABLE,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';

import { BIRDS, AMPHIBIANS, MAMMALS, REPTILES } from 'constants/geo-processing-services';

import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import { percentageFormat, localeFormatting, capPercentage, roundUpPercentage } from 'utils/data-formatting-utils';

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';
export const SPECIES_SLUG = 'species';
export const PROTECTED_AREAS = 'protected-areas';
export const NATIONAL_BOUNDARIES = 'national-boundaries';
export const SUBNATIONAL_BOUNDARIES = 'subnational-boundaries';

export const AOI_LEGEND_CATEGORIES = [
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG
]

export const SEARCH_SOURCES = {
  [NATIONAL_BOUNDARIES]: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  [SUBNATIONAL_BOUNDARIES]: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  [PROTECTED_AREAS]: WDPA_OECM_FEATURE_LAYER
}

//export const { NATIONAL_BOUNDARIES, SUBNATIONAL_BOUNDARIES, PROTECTED_AREAS } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = NATIONAL_BOUNDARIES;

export const PRECALCULATED_AOI_OPTIONS = [
  {title: SEARCH_SOURCES[NATIONAL_BOUNDARIES], slug: NATIONAL_BOUNDARIES, label: 'National boundaries'},
  {title: SEARCH_SOURCES[SUBNATIONAL_BOUNDARIES], slug: SUBNATIONAL_BOUNDARIES, label: 'Subnational boundaries'},
  {title: SEARCH_SOURCES[PROTECTED_AREAS], slug: PROTECTED_AREAS, label: 'Protected areas'},
]

export const PRECALCULATED_LAYERS_CONFIG = {
  [NATIONAL_BOUNDARIES] : {
    name: 'NAME_0',
    dataLayer: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
    displayLayer: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  },
  [SUBNATIONAL_BOUNDARIES] : {
    name: 'NAME_1',
    subtitle: 'GID_0',
    dataLayer: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
    displayLayer: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  },
  [PROTECTED_AREAS] : {
    name: 'NAME',
    subtitle: 'ISO3',
    displayLayer: WDPA_OECM_FEATURE_LAYER,
    dataLayer: WDPA_PRECALCULATED_DATA_TABLE
  }
}

export const AOIS_HISTORIC = process.env.NODE_ENV === "development" ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;

export const SIDEBAR_CARDS_CONFIG = {
  [SPECIES_SLUG]: {
    title: (speciesCount) => `This area is expected to have ${speciesCount} `,
    hint: 'Global high-resolution data is presently available for terrestrial vertebrates. The Half-Earth Project is actively engaged in expanding our taxonomic coverage to other species groups such as ants, bees, butterflies, dragonflies, vascular plants, marine and freshwater fishes, and marine crustaceans.',
    warning: <span>Species summaries are less reliable for areas under 1,000 km<sup>2</sup>; only a portion of these species will be found here.</span>
  },
  [BIODIVERSITY_SLUG]: {
    title: 'What is the biodiversity pattern in this area?',
    description: () => 'Species range maps are summarised in biodiversity richness which informs rarity driving __Half-Earth Project’s__ prioritisation exercise.',
    warning: 'Biodiversity patterns not available for areas under __1,000 km2__.'
  },
  [PROTECTION_SLUG]: {
    title: 'What is already protected in this area?',
    description: ({percentageProtected}) => `Of the current area, __${roundUpPercentage(percentageFormat(capPercentage(percentageProtected)))}% of land is under formal protection__.`,
    warning: null
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: 'How are humans affecting this area?',
    description: ({pressures}) => `Of the current area, __${roundUpPercentage(getTotalPressures(capPercentage(pressures)))}% is under human pressure__,
    the majority of which are pressures from ${getMainPressure(pressures)}.`,
    warning: null
  },
}

export const SPECIES_FILTERS = [
  {slug: 'all', label: 'vertebrates'},
  {slug: BIRDS, label: 'birds'},
  {slug: MAMMALS, label: 'mammals'},
  {slug: REPTILES, label: 'reptiles'},
  {slug: AMPHIBIANS, label: 'amphibians'},
]

export const DEFAULT_SPECIES_FILTER = {slug: 'all', label: 'vertebrates'};

export const IUCN_CATEGORIES = {
  EX: 'Extinct',
  EW: 'Extinct in the wild',
  CR: 'Critically endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near threatened',
  LC: 'Least concern',
  DD: 'Data deficient',
  NE: 'Not evaluated',
}

export const HIGHER_AREA_SIZE_LIMIT = 35000;

export const WARNING_MESSAGES = {
  area: {
    title: 'Area size too big',
    description: (size) => (<span>The maximum size for on the fly area analysis is {localeFormatting(HIGHER_AREA_SIZE_LIMIT)} km<sup>2</sup>.
    The area that you are trying to analyze has {localeFormatting(size)} km<sup>2</sup>. Please select a smaller area to trigger the analysis.</span>)
  },
  400: {
    title: 'File too big',
    description: () => 'File exceeds the max size allowed of 10MB. Please provide a smaller file to trigger the analysis.'
  },
  500: {
    title: 'Server error',
    description: () => 'An error ocurred during the file upload. Please try again'
  }
}
