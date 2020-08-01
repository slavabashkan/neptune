import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import styles from './FolderHeader.module.scss';

const FolderHeader: React.FC = () => {

  const { currentFolder } = useSelector<RootState, RootState>(state => state);

  if (!currentFolder) {
    return <></>;
  }

  return (
    <div className={styles.folderHeader}>
      <div>
        <h2 className={styles.folderName}>{currentFolder.name}</h2>
      </div>
      <div>
        <span className={styles.dates}>28 August – 12 September 2019</span>
      </div>
    </div>
  );
};

export default FolderHeader;
