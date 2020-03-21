import React, { useState } from 'react';
import { ContextMenu } from '@blueprintjs/core';
import styles from './LibraryView.module.scss';
import FoldersTree from './FoldersTree';
import LibraryHeaderContextMenu from './LibraryHeaderContextMenu';

const LibraryView: React.FC = () => {

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();

    ContextMenu.show(
      <LibraryHeaderContextMenu />,
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
