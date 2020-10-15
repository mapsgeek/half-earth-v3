import { useEffect } from 'react';

const LocalSceneViewManager = ({
  view,
  localGeometry
}) => {
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      view.clippingArea = extent;
      
      view.goTo({ target: extent, tilt: 40 })
      .catch(error => {
        const newViewpoint = view.viewpoint.clone();
        newViewpoint.targetGeometry = extent;
        view.viewpoint = newViewpoint;
        view.goTo({tilt: 40})
      }
        )
    }
  }, [localGeometry]);

  return null;
}

export default LocalSceneViewManager;