import QueryTask from "@arcgis/core/tasks/QueryTask";
import Query from "@arcgis/core/tasks/support/Query";
import { METADATA_SERVICE_URL } from 'constants/layers-urls';

function getMetadata(slug) {
  return new Promise((resolve, reject) => {
    var queryTask = new QueryTask({
      url: METADATA_SERVICE_URL
    });
    var query = new Query();
    query.outFields = ["*"];
    query.where = `layerSlug = '${slug}'`;
    queryTask.execute(query).then(function(results){
        if (results && results.features && results.features.length > 0) {
          resolve(results.features[0].attributes);
        }
        resolve(null);
    });
  })
}

export default {
  getMetadata
}