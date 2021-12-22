import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// services
import EsriFeatureService from 'services/esri-feature-service';

// constants
import { LAYERS_URLS } from 'constants/layers-urls';
import { GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER } from 'constants/layers-slugs';

// local
import mapStateToProps from './selectors';
import Component from './component';

const Container = (props) => {
  const { aoiId } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
      whereClause: `MOL_IDg = '${aoiId}'`,
      returnGeometry: false
    }).then((features) => {
      setData(features.map((f) => f.attributes));
    })
  }, [aoiId]);

  return (
    <Component
      data={data}
      {...props}
    />
  )
}

export default connect(mapStateToProps, null)(Container);
