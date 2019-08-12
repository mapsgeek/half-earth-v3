import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { setSelectedFeaturedPlace } from 'utils/featured-globe-utils';
import { DATA } from 'router';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';
import * as urlActions from 'actions/url-actions';
import featuredMapsActions from 'redux_modules/featured-maps-list';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, ...featuredMapsActions, ...urlActions, handleSwitch}

const feturedGlobeContainer = props => {

  const { changeUI, changeGlobe } = props;

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])

  const handleMapLoad = (map, view) => {
    const { layers } = map;
    const featuredPlacesLayer = layers.items.find(l => l.title === FEATURED_PLACES_LAYER);

    view.on("pointer-down", function(event) {
      setSelectedFeaturedPlace(event, featuredPlacesLayer, view, changeUI);
    });
  }

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, changeGlobe);

  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      onLoad={(map, view) => handleMapLoad(map, view)}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);