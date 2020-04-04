import { ContextMenu } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import FoldersTree from './FoldersTree';
import LibraryHeaderContextMenu from './LibraryHeaderContextMenu';
import styles from './LibraryView.module.scss';

const LibraryView: React.FC = () => {

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();

    ContextMenu.show(
      <Provider store={store}><LibraryHeaderContextMenu /></Provider>,
      { left: e.clientX, top: e.clientY },
      () => setIsContextMenuOpen(false),
      true
    );

    setIsContextMenuOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={`context-menu-node ${(isContextMenuOpen ? 'context-menu-open' : '')}`} onContextMenu={showContextMenu}>
        <h3 className={styles.header}>Library</h3>
      </div>
      <div className={styles.foldersTree}>
        <FoldersTree />
      </div>
    </div>
  );

};

export default LibraryView;
