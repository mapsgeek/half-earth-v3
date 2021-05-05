import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Locator from "@arcgis/core/tasks/Locator";
import { getCoordsFromZipAndCountry } from 'utils/locator-utils';
import { createPointGraphic, createGraphicLayer, simplePictureMarker } from 'utils/graphic-layer-utils';
import signedPledgeLightIcon from 'images/my_pledge.png'
import { SIGNED_PLEDGE_GRAPHIC_LAYER } from 'constants/layers-slugs';

export const addSignedPledgeToMap = (map, view, ZIP, countryCode) => {
  getCoordsFromZipAndCountry(Locator, ZIP, countryCode).then(data => {
      const { x, y } = data;
      const signedPledgeLight = simplePictureMarker(signedPledgeLightIcon);
      const pointGraphic = createPointGraphic(Graphic, signedPledgeLight, x, y);
      const signedPledgeGraphicLayer = createGraphicLayer(GraphicsLayer, pointGraphic, SIGNED_PLEDGE_GRAPHIC_LAYER);
      map.add(signedPledgeGraphicLayer);
      view.goTo({ center: [x, y] });
  })
}