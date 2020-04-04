import { Reducer } from 'redux';
import { FoldersTreeItem } from '../models/FoldersTreeItem';
import { ActionType, DispatchAction } from '../actions';

export interface RootState {
  foldersTree: FoldersTreeItem[];
}

const initialState: RootState = { foldersTree: [] };

export const rootReducer: Reducer<RootState, DispatchAction> = (state = initialState, action): RootState => {
  if (action.type === ActionType.fetchFoldersTree) {
    return { ...state, foldersTree: action.payload.foldersTree || initialState.foldersTree };
  }

  return state;
};
