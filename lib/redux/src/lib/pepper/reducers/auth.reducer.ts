import {
  ActionReducerMapBuilder,
  createSlice,
  AnyAction,
} from '@reduxjs/toolkit';

const name = 'authSlice';

type IState = {
  loading: boolean;
  success: boolean;
};

type IAction = {
  reset: () => AnyAction;
};

export type IAuth = {
  state: { [name]: IState };
  action: { [name]: IAction };
};

const initialState: IState = {
  loading: false,
  success: false,
};

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    reset: (state: IState) => {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('pending') !== -1;
      },
      (state: IState) => {
        state.loading = true;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('fulfilled') !== -1;
      },
      (state: IState) => {
        state.success = true;
      }
    );
    buider.addMatcher(
      (action) => {
        console.log(action);
        return action.type.indexOf('rejected') !== -1;
      },
      (state: IState, action) => {
        state.loading = false;
        state.success = false;
      }
    );
    // --- external
    buider.addMatcher(
      (action) => {
        return action.type === 'appSlice/resetAlert';
      },
      (state: IState) => {
        state.loading = false;
        state.success = false;
      }
    );
  },
});

export default appSlice;
