import { createStructuredSelector } from 'reselect';
import { selectSceneMap, selectSceneView } from 'selectors/scene-selectors';


export default createStructuredSelector({
  map: selectSceneMap,
  view: selectSceneView,
});