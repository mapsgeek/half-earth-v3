// dependencies
import React from "react";
import cx from "classnames";
import loadable from "@loadable/component";
// components
import DataScene from "scenes/data-scene";
import DataGlobalSidebar from "containers/sidebars/data-global-sidebar";
import HalfEarthLogo from "components/half-earth-logo";
import MainMenu from "components/main-menu";
//styles
import styles from "./styles.module.scss";
import uiStyles from "styles/ui.module.scss";
import animationStyles from "styles/common-animations.module.scss";
// Dynamic imports
const InfoModal = loadable(() => import("components/modal-metadata"));
const Spinner = loadable(() => import("components/spinner"));

const DataGlobeComponent = ({
  sceneMode,
  countryISO,
  userConfig,
  countryName,
  hasMetadata,
  openedModal,
  activeLayers,
  activeOption,
  handleMapLoad,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
  isGlobeUpdating,
  selectedSpecies,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  countryTooltipDisplayFor,
  isLandscapeSidebarCollapsed,
}) => {
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu />
      <DataScene
        sceneMode={sceneMode}
        userConfig={userConfig}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeOption={activeOption}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isSidebarOpen={isSidebarOpen}
        selectedSpecies={selectedSpecies}
        isLandscapeMode={isLandscapeMode}
        isFullscreenActive={isFullscreenActive}
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {isGlobeUpdating && <Spinner floating />}
      <DataGlobalSidebar
        activeLayers={activeLayers}
        activeOption={activeOption}
        isSidebarOpen={isSidebarOpen}
        activeCategory={activeCategory}
        isLandscapeMode={isLandscapeMode}
        isFullscreenActive={isFullscreenActive}
        countedActiveLayers={countedActiveLayers}
        isBiodiversityActive={isBiodiversityActive}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        className={cx(styles.sidebarContainer, {
          // [animationStyles.leftHidden]: sidebarHidden,
        })}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default DataGlobeComponent;
