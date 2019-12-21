import { Intent } from '@blueprintjs/core';
import { ErrorPopupPortal } from '../components/Popups';

/**
 * Execute the passed function and show an error message if one has occured.
 * @param apiFunction Executing api function.
 */
export const callApi = async <T>(apiFunction: () => Promise<T>, defaultResult: T): Promise<T> => {
  try {
    return await apiFunction();
  } catch (e) {
    ErrorPopupPortal.show({ message: e.message, icon: 'error', intent: Intent.DANGER, timeout: 0 });
    return defaultResult;
  }
}