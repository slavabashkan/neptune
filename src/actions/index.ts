import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as libraryApi from '../api/libraryApi';
import { RootState } from '../store/rootReducer';
import { callApi } from '../utils/viewHelpers';

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<RootState>;
}

export enum ActionType {
  fetchFoldersTree
}

export const fetchFoldersTree: ActionCreator<ThunkAction<Promise<DispatchAction>, RootState, void, DispatchAction>> =
  () => async (dispatch: Dispatch<DispatchAction>): Promise<DispatchAction> => {
    const foldersTree = await callApi(libraryApi.fetchFoldersTree, []);
    return dispatch({
      type: ActionType.fetchFoldersTree,
      payload: { foldersTree }
    });
  };
