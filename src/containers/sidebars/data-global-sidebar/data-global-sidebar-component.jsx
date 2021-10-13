// dependencies
import React from 'react';
import cx from 'classnames';
// components
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';
// styles
import styles from './data-global-sidebar-styles.module.scss';

const DataGlobalSidebarComponent = ({
  className,
  activeLayers,
  activeCategory,
  countedActiveLayers,
}) => {

  return (
    <div className={cx(styles.container,className)}>
      <AnalyzeAreasSidebarCard
        activeLayers={activeLayers}
      />
      <BiodiversitySidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        className={styles.biodiversitySidebarCard}
        countedActiveLayers={countedActiveLayers}
      />
      <ProtectedAreasSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        countedActiveLayers={countedActiveLayers}
      />
      <HumanImpactSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        countedActiveLayers={countedActiveLayers}
      />
    </div>
  )
}

export default DataGlobalSidebarComponent;