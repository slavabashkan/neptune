import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { callApi } from '../utils/viewHelpers';
import * as libraryApi from '../api/libraryApi';

const LibraryHeaderContextMenu: React.FC = () => {

  const handleReloadClick = async (): Promise<void> => {
    await callApi(libraryApi.reload, undefined);
  }

  return (
    <Menu>
      <MenuItem onClick={handleReloadClick} icon='refresh' text='Reload'/>
    </Menu>
  );
  
}

export default LibraryHeaderContextMenu;