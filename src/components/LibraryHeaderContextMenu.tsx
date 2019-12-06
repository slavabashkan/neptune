import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import * as libraryApi from '../api/libraryApi';
import { callApi } from '../utils/viewHelpers';

const LibraryHeaderContextMenu: React.FC = () => {
  
  const handleReloadClick = async (): Promise<void> => {
    await callApi(libraryApi.reload);
  }

  return (
    <Menu>
      <MenuItem onClick={handleReloadClick} icon='refresh' text='Reload'/>
    </Menu>
  );
  
}

export default LibraryHeaderContextMenu;