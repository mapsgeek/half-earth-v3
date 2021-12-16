import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  WDPA_PRECALCULATED_DATA_TABLE
} from 'constants/layers-slugs';

import {
  NATIONAL_BOUNDARIES,
  SUBNATIONAL_BOUNDARIES,
  PROTECTED_AREAS,
} from 'constants/analyze-areas-constants';


const MAP_TOOLTIP_CONFIG = {
  [NATIONAL_BOUNDARIES] : {
    title: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID',
    dataLayer: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  },
  [SUBNATIONAL_BOUNDARIES] : {
    title: 'NAME_1',
    subtitle: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID',
    dataLayer: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  },
  [PROTECTED_AREAS] : {
    title: 'NAME',
    subtitle: 'ISO3',
    buttonText: 'analyze area',
    id: 'MOL_ID',
    dataLayer: WDPA_PRECALCULATED_DATA_TABLE
  }
}

export default MAP_TOOLTIP_CONFIG;