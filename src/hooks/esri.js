import { useState, useEffect } from 'react';
import { LAYERS_URLS } from 'constants/layers-urls';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Search from "@arcgis/core/widgets/Search";
import Locator from "@arcgis/core/tasks/Locator";

export const useFeatureLayer = ({layerSlug, outFields = ["*"]}) => {
  const [layer, setLayer] = useState(null);
  useEffect(() => {
    const _layer = new FeatureLayer({
      url: LAYERS_URLS[layerSlug],
      outFields
    });
    setLayer(_layer)
  }, [])
  return layer;
}

export const useSearchWidgetLogic = (view, openPlacesSearchAnalyticsEvent, searchTermsAnalyticsEvent, searchWidgetConfig) => {
  const [searchWidget, setSearchWidget ] = useState(null);
  const { searchSources, postSearchCallback} = searchWidgetConfig || {};
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27 && view && searchWidget) {
      handleCloseSearch();
    }
  };

  const handleOpenSearch = () => {
    if(searchWidget === null) {
      setSearchWidget(undefined); // reset search widget in case of multiple quick clicks
      const container = document.createElement("div");
      container.setAttribute("id", "searchWidget");
      const sWidget = new Search({
        view: view,
        locationEnabled: true, // do not show the Use current location box when clicking in the input field
        popupEnabled: false, // hide location popup
        resultGraphicEnabled: false, // hide location pin
        container,
        sources: searchSources(FeatureLayer, Locator),
        includeDefaultSources: false
      });
      setSearchWidget(sWidget);
      openPlacesSearchAnalyticsEvent();
    }
  };

  const handleCloseSearch = () => {
    view.ui.remove(searchWidget);
    document.removeEventListener('keydown', keyEscapeEventListener);
    setSearchWidget(null);
  }

  const handleSearchStart = () => {
    handleCloseSearch();
  }

  const addSearchWidgetToView = async () => {
    await view.ui.add(searchWidget, "top-left");
    const esriSearch = document.querySelector('#searchWidget');
    const rootNode = document.getElementById("root");
    if(esriSearch) {
      rootNode.appendChild(esriSearch);
      setTimeout(() => {
        const input = document.querySelector('.esri-search__input');
        input && input.focus()
      }, 300);
    }
  }

  useEffect(() => {
    if( searchWidget ) {
      addSearchWidgetToView();
      document.addEventListener('keydown', keyEscapeEventListener);
      searchWidget.viewModel.on("search-start", handleSearchStart);
      searchWidget.on('select-result', (event) => postSearchCallback(event));
      searchWidget.on('suggest-complete', (event) => searchTermsAnalyticsEvent(event.searchTerm));
    }

    return function cleanUp() {
      document.removeEventListener('keydown', keyEscapeEventListener);
    }
  }, [searchWidget]);

  return {
    handleOpenSearch,
    handleCloseSearch,
    searchWidget
  }
}
