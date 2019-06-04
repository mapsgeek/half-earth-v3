import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { useSpring, animated } from 'react-spring';
import FixedHeader from 'components/fixed-header';

import uiStyles from 'styles/ui.module';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ map, view, theme, children, activeCategory, handleSidebarToggle, isSidebarOpen, isLandscapeMode }) => {
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isSidebarOpen && !isLandscapeMode ? 0 : -400,
    delay: isSidebarOpen && !isLandscapeMode ? 400 : 0
  })

  return (
    <animated.aside
      className={cx(
        uiStyles.uiTopLeft,
        styles.sidebar,
        theme.sidebar
      )}
      style={slide}
    >
      <div className={styles.wrapper}>
        <FixedHeader closeSidebar={handleSidebarToggle} activeCategory={activeCategory} />
        <div className={styles.content}>
          {React.Children.map(children || null, (child, i) => {
            return child && <child.type {...child.props} key={i} map={map} view={view}/>;
          })}
        </div>
      </div>
    </animated.aside>
  )
}


Sidebar.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.shape({ sidebar: PropTypes.string })
};

Sidebar.defaultProps = {
  children: null,
  theme: {}
};

export default Sidebar;