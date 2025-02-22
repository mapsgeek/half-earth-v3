import React, { useEffect, useState } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import featuredMapsActions from 'redux_modules/featured-maps-list';

import { readStoryAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import {
  hitResults, setAvatarImage, removeAvatarImage, setSelectedFeaturedPlace, setCursor,
} from 'utils/globe-events-utils';
import { layerManagerToggle, activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';

import { loadModules } from 'esri-loader';

import {
  FEATURED_GLOBE_LANDSCAPE_ONLY_LAYERS,
} from 'constants/layers-groups';
import {
  FEATURED_PLACES_LAYER,
  VIBRANT_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
} from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';
import { useMobile } from 'constants/responsive';

import Component from './featured-globe-component.jsx';
import mapStateToProps from './featured-globe-selectors';

const actions = { ...featuredMapsActions, ...urlActions, readStoryAnalytics };

const featuredGlobeContainer = (props) => {
  const [handle, setHandle] = useState(null);
  const isOnMobile = useMobile();
  const locale = useLocale();

  const {
    changeUI, changeGlobe, featuredMapPlaces, selectedFeaturedMap, isFeaturedPlaceCard, isFullscreenActive,
  } = props;

  const handleMarkerClick = (viewPoint, view) => {
    if (!isFullscreenActive) {
      setSelectedFeaturedPlace(viewPoint, FEATURED_PLACES_LAYER, changeUI);
      props.readStoryAnalytics();
      removeAvatarImage();
    }
  };
  const handleMarkerHover = (viewPoint, view) => {
    if (!isOnMobile) {
      const layerFeatures = hitResults(viewPoint, FEATURED_PLACES_LAYER);
      setCursor(layerFeatures);
      if (!isFeaturedPlaceCard) setAvatarImage(view, layerFeatures, selectedFeaturedMap, featuredMapPlaces);
    }
  };

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList(locale);
  }, [locale]);

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, VIBRANT_BASEMAP_LAYER] });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  const spinGlobe = (view) => {
    loadModules(['esri/core/scheduling']).then(([scheduling]) => {
      const camera = view.camera.clone();
      const spinningGlobe = scheduling.addFrameTask({
        update() {
          camera.position.longitude -= 0.2;
          view.camera = camera;
        },
      });
      setHandle(spinningGlobe);
    });
  };

  const handleGlobeUpdating = (updating) => props.changeGlobe({ isGlobeUpdating: updating });
  const toggleLayer = (layerId) => layerManagerToggle(layerId, props.activeLayers, changeGlobe);
  // Array of funtions to be triggered on scene click
  const clickCallbacksArray = [
    handleMarkerClick,
  ];

  const mouseMoveCallbacksArray = [
    handleMarkerHover,
  ];

  const showLayersOnlyOnLandscape = ({ layer, isVisible }) => {
    const isLandscapeOnlyLayer = FEATURED_GLOBE_LANDSCAPE_ONLY_LAYERS.includes(layer.title);
    // Hide human_pressures_layer where they are not in landscape mode
    if (isLandscapeOnlyLayer) {
      layer.visible = props.isLandscapeMode && isVisible;
    }
  };

  const setVibrantLayerMaxScale = ({ layer }) => {
    if (layer.title === VIBRANT_BASEMAP_LAYER) {
      layer.maxScale = 250000.0;
    }
  };
  const { activeLayers } = props;
  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      customFunctions={[showLayersOnlyOnLandscape, setVibrantLayerMaxScale]}
      spinGlobe={spinGlobe}
      spinGlobeHandle={handle}
      isFeaturedPlaceCard={isFeaturedPlaceCard}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
};

export default connect(mapStateToProps, actions)(featuredGlobeContainer);
