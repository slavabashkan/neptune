import React from 'react';
import styles from './MainPanel.module.scss';
import LibraryView from './LibraryView';

const MainPanel: React.FC = () => (
  <div className={styles.mainPanel}>
    <LibraryView />
  </div>
);

export default MainPanel;
