import * as React from 'react';
import styles from './LibraryView.module.scss';
import FoldersTree from './FoldersTree';

const LibraryView: React.FC = () => {
  return (
    <div>
      <h3 className={styles.header}>Library</h3>
      <FoldersTree></FoldersTree>
    </div>
  );
}

export default LibraryView;