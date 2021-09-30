import {
ECOREGIONS_FEATURE_LAYER,
ADMIN_AREAS_FEATURE_LAYER,
AOIS_HISTORIC_PRODUCTION,
AOIS_HISTORIC_DEVELOPMENT,
WDPA_OECM_FEATURE_LAYER
} from 'constants/layers-slugs';

import { getTotalPressures, getMainPressure} from 'utils/analyze-areas-utils';

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';

export const AOI_LEGEND_CATEGORIES = [
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG
]

const SEARCH_SOURCES = {
  ECOREGIONS: ECOREGIONS_FEATURE_LAYER,
  POLITICAL_BOUNDARIES: ADMIN_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS: WDPA_OECM_FEATURE_LAYER
}

export const { ECOREGIONS, POLITICAL_BOUNDARIES, PROTECTED_AREAS } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = POLITICAL_BOUNDARIES;

export const PRECALCULATED_AOI_OPTIONS = [
  {title: POLITICAL_BOUNDARIES, slug: POLITICAL_BOUNDARIES, label: 'Political boundaries'},
  {title: ECOREGIONS, slug: ECOREGIONS, label: 'Ecoregions'},
  {title: PROTECTED_AREAS, slug: PROTECTED_AREAS, label: 'Protected areas'},
]

export const AOIS_HISTORIC = process.env.NODE_ENV === "development" ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;
