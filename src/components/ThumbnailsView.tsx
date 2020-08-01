import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import styles from './ThumbnailsView.module.scss';

const ThumbnailsView: React.FC = () => {

  const { currentFolder } = useSelector<RootState, RootState>(state => state);

  if (!currentFolder) {
    return <></>;
  }

  return (
    <div className={styles.thumbnailsView}>Thumbnails view</div>
  );

};

export default ThumbnailsView;
