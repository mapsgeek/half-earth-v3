import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Component from './scene-component';
import { whenTrue } from "@arcgis/core/core/watchUtils";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const SceneContainer = (props) => {
  const {
    sceneId,
    sceneName,
    loaderOptions,
    sceneSettings,
    changeGlobe,
    onMapLoad,
    onViewLoad,
    urlParamsUpdateDisabled
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [loadState, setLoadState] = useState('loading');

  useEffect(() => {
    const _map = new Map({
      basemap: SATELLITE_BASEMAP_LAYER,
    });
    setMap(_map);
    onMapLoad && onMapLoad(_map);
  }, [])

  useEffect(() => {
    if (map) {
      const _view = new SceneView({
        map: map,
        container: `scene-container-${sceneName || sceneId}`,
        ...sceneSettings
      });
      setView(_view);
    }
  },[map])

  useEffect(() => {
    if (map && view) {
      setLoadState('loaded');
      onViewLoad && onViewLoad(map, view);
    }
  }, [map, view]);

  // Update location in URL
  useEffect(() => {
    let watchHandle;
    if (view && view.center && !urlParamsUpdateDisabled) {
      watchHandle = whenTrue(view, "stationary", function() {
        const { longitude, latitude } = view.center;
        changeGlobe({ center: [longitude, latitude], zoom: view.zoom });
      });
    }

    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [view]);

  return (
    <Component
      loadState={loadState}
      map={map}
      view={view}
      {...props}
    />
  )
}

export default connect(null, actions)(SceneContainer);