import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import libraryApi from '../api/libraryApi';

const LibraryHeaderContextMenu: React.FC = () => {
  
  const handleReloadClick = (): void => {
    libraryApi.reload();
  }

  return (
    <Menu>
      <MenuItem onClick={handleReloadClick} icon='refresh' text='Reload'/>
    </Menu>
  );
  
}

export default LibraryHeaderContextMenu;