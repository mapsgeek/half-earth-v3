import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'
import styles from './experiences-styles.module';

const ExpertMode = loadable(() => import('./data-globe'));
const FeaturedMode = loadable(() => import('./featured-globe'));

const Experiences = ({ route, queryParams, switchToExpert, switchToFeature }) => {
  const isExpertMode = route.path === '/dataGlobe';

  const preserveParams = (handler) => {
    return handler({ query: { ...queryParams } });
  }

  return (
    <>
      <div className={cx({ [styles.hidden]: !isExpertMode })}>
        <ExpertMode handleSwitch={() => { preserveParams(switchToFeature) }} />
      </div>
      <div className={cx({ [styles.hidden]: isExpertMode })}>
        <FeaturedMode handleSwitch={() => { preserveParams(switchToExpert) }} />
      </div>
    </>
  )
};

export default Experiences;
