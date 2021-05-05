import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { whenFalseOnce } from "@arcgis/core/core/watchUtils";
import Component from './national-report-pdf-component';
import { connect } from 'react-redux';
import mapStateToProps from 'components/local-scene-sidebar/local-scene-sidebar-selectors';

const NationalReportPdfContainer = (props) => {
  let watchHandle;
  const { view, countryISO } = props;
  const [sceneScreenshotUrl, setSceneScreenshotUrl] = useState();

  useEffect(() => {
    watchHandle = whenFalseOnce(view, "updating", function() {
        getSceneImageUrl();
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[countryISO]);

const getSceneImageUrl = ()=> {
  const options = {
    width: 430
  }
  view.takeScreenshot(options).then(function(screenshot) {
    setSceneScreenshotUrl(screenshot.dataUrl);
  })
}

  return (
    ReactDOM.createPortal(
      <Component
        sceneScreenshotUrl={sceneScreenshotUrl}
        {...props}
      />,
      document.getElementById('root')
    )
  )
}

export default connect(mapStateToProps, null)(NationalReportPdfContainer);