import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  WDPA_PRECALCULATED_DATA_TABLE,
  } from 'constants/layers-slugs';

import {
  PROTECTED_AREAS,
  NATIONAL_BOUNDARIES,
  SUBNATIONAL_BOUNDARIES,
} from 'constants/analyze-areas-constants';

import { LAYERS_URLS } from 'constants/layers-urls';

export const SEARCH_SOURCES_CONFIG = {
  [NATIONAL_BOUNDARIES]: {
    url: LAYERS_URLS[GADM_0_ADMIN_AREAS_FEATURE_LAYER],
    title: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME_0", "GID_0"],
    suggestionTemplate: '{NAME_0}'
  },
  [SUBNATIONAL_BOUNDARIES]: {
    url: LAYERS_URLS[GADM_1_ADMIN_AREAS_FEATURE_LAYER],
    title: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME_1", "NAME_0"],
    suggestionTemplate: '{NAME_1}, {NAME_0}'
  },
  [PROTECTED_AREAS]: {
    url: LAYERS_URLS[WDPA_PRECALCULATED_DATA_TABLE],
    title: WDPA_OECM_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME"],
    suggestionTemplate: '{NAME}, {ISO3}'
  },
  [GLOBAL_SPI_FEATURE_LAYER]: {
    url: LAYERS_URLS[GLOBAL_SPI_FEATURE_LAYER],
    title: GLOBAL_SPI_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME_0"],
    suggestionTemplate: '{NAME_0}'
  },
}