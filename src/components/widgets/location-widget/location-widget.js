import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LocateView from "@arcgis/core/widgets/Locate/LocateViewModel";

import LocationWidgetComponent from './location-widget-component';
import * as urlActions from 'actions/url-actions';
import { clickFindMyPositionAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...urlActions, clickFindMyPositionAnalyticsEvent };

const LocationWidget = props => {
  const { view, clickFindMyPositionAnalyticsEvent, hidden } = props;
  const [locationWidget, setLocationWidget] = useState(null);

  useEffect(() => {
    const node = document.createElement("div");
    const locationWidget = new LocateView({
      view: view,
      graphic: ''
    });
    locationWidget.on("locate", () => clickFindMyPositionAnalyticsEvent());
    setLocationWidget(locationWidget);
    if (!hidden) {
      view.ui.add(node, "top-right");
      ReactDOM.render(<LocationWidgetComponent locationWidget={locationWidget} />, node);
    }
    return function cleanup() {
      view.ui.remove(locationWidget);
      ReactDOM.render(null, node);
    };
  }, [view, hidden])

  return null;
}

export default connect(null, actions)(LocationWidget);
