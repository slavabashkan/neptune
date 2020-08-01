import { Reducer } from 'redux';
import { FoldersTreeItem } from '../models/FoldersTreeItem';
import { ActionType, DispatchAction } from '../actions';

export interface RootState {
  foldersTree: FoldersTreeItem[];
  currentFolder: FoldersTreeItem|null;
}

const initialState: RootState = {
  foldersTree: [],
  currentFolder: null
};

export const rootReducer: Reducer<RootState, DispatchAction> = (state = initialState, action): RootState => {
  if (action.type === ActionType.fetchFoldersTree) {
    return {
      ...state,
      foldersTree: action.payload.foldersTree || initialState.foldersTree,
      currentFolder: initialState.currentFolder
    };
  }

  if (action.type === ActionType.setCurrentFolder) {
    return {
      ...state,
      currentFolder: action.payload.currentFolder || initialState.currentFolder
    };
  }

  return state;
};
