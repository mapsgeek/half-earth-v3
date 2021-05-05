import Query from "@arcgis/core/tasks/support/Query";
import QueryTask from "@arcgis/core/tasks/QueryTask";
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

function getFeatures({ url, whereClause = "", outFields = ["*"], returnGeometry = false, outSpatialReference = LOCAL_SPATIAL_REFERENCE }) {
  return new Promise((resolve, reject) => {
    var queryTask = new QueryTask({
      url
    });
    var query = new Query();
    query.outFields = outFields;
    query.where = whereClause;
    query.returnGeometry = returnGeometry;
    query.outSpatialReference = outSpatialReference;
    queryTask.execute(query).then(function(results){
        if (results && results.features && results.features.length > 0) {
          resolve(results.features);
        }
        resolve(null);
    });
  })
}

export default {
  getFeatures
}