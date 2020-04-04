import { Menu, MenuItem } from '@blueprintjs/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchFoldersTree } from '../actions';
import * as libraryApi from '../api/libraryApi';
import { callApi } from '../utils/viewHelpers';

const LibraryHeaderContextMenu: React.FC = () => {

  const dispatch = useDispatch();

  const handleReloadClick = async (): Promise<void> => {
    await callApi(libraryApi.reload, undefined);
    dispatch(fetchFoldersTree());
  };

  return (
    <Menu>
      <MenuItem onClick={handleReloadClick} icon="refresh" text="Reload" />
    </Menu>
  );

};

export default LibraryHeaderContextMenu;
