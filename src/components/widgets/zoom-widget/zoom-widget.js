import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ZoomView from "@arcgis/core/widgets/Zoom/ZoomViewModel";
import ZoomWidgetComponent from './zoom-widget-component';
import * as actions from 'actions/url-actions';

const ZoomWidget = props => {
  const { view, hidden } = props;
  const [zoomWidget, setZoomWidget] = useState(null);

  // Load custom zoom widget
  useEffect(() => {
    const node = document.createElement("div");
    const zoomWidget = new ZoomView({
      view: view
    });
    setZoomWidget(zoomWidget);
    if (!hidden) {
      view.ui.add(node, "top-right");
      ReactDOM.render(<ZoomWidgetComponent zoomWidget={zoomWidget} />, node);
    }
    return function cleanup() {
      view.ui.remove(zoomWidget);
      ReactDOM.render(null, node);
    };
  }, [view, hidden])


  return null;
}

export default connect(null, actions)(ZoomWidget);