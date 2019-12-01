import React from 'react';
import styles from './MainPanel.module.scss';
import LibraryView from './LibraryView';

const MainPanel: React.FC = () => {
  return (
    <div className={styles.mainPanel}>
      <LibraryView></LibraryView>
    </div>
  );
}

export default MainPanel;