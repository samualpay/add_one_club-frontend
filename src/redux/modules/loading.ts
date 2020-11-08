// State
type LoadingState = {
  isLoading: number;
};
enum LoadingEnum {
  SHOW,
  DISMISS,
}
const initialState: LoadingState = { isLoading: 0 };

//  Action
export type LoadingAction = {
  type: LoadingEnum;
};
export const show = (): LoadingAction => {
  return { type: LoadingEnum.SHOW };
};
export const dismiss = (): LoadingAction => {
  return { type: LoadingEnum.DISMISS };
};

// Reducer
export function loadingReducer(
  state = initialState,
  action: LoadingAction
): LoadingState {
  const { isLoading } = state;
  switch (action.type) {
    case LoadingEnum.SHOW:
      console.log(isLoading +1)
      return { isLoading: isLoading + 1 };
    case LoadingEnum.DISMISS:
      console.log(isLoading - 1)
      return { isLoading: isLoading - 1 };
    default:
      return state;
  }
}
