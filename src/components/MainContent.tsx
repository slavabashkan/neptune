import React from 'react';
import FolderHeader from './FolderHeader';
import styles from './MainContent.module.scss';
import ThumbnailsView from './ThumbnailsView';

const MainContent: React.FC = () => (
  <div className={styles.mainContent}>
    <FolderHeader />
    <ThumbnailsView />
  </div>
);

export default MainContent;
