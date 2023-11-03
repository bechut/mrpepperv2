import {
  ActionReducerMapBuilder,
  createSlice,
  AnyAction,
} from '@reduxjs/toolkit';

const name = 'appSlice';

function errorHandler(state: IState, errorMsg: string) {
  let error: {
    message: string;
    status: boolean;
    show: boolean;
  };
  try {
    error = JSON.parse(errorMsg);
  } catch (e) {
    error = {
      message: errorMsg,
      status: false,
      show: true,
    };
  }
  state.alert = {
    message: error.message,
    status: error.status,
    show: true,
  };
}

type IState = {
  alert: {
    message: string;
    status: boolean;
    show: boolean;
  };
};

type IAction = {
  setAlert: (a: { message: string; status: boolean }) => AnyAction;
  resetAlert: () => AnyAction;
};

export type IApp = {
  state: { [name]: IState };
  action: { [name]: IAction };
};

const initialState: IState = {
  alert: {
    message: '',
    status: false,
    show: false,
  },
};

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = {
        show: true,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    resetAlert: (state: IState) => {
      state.alert = initialState.alert;
    },
  },
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('fulfilled') !== -1;
      },
      (state: IState, action) => {
        if (action.payload?.message && action.payload?.status)
          errorHandler(state, JSON.stringify(action.payload));
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('rejected') !== -1;
      },
      (state: IState, action) => {
        if (action.error.message) errorHandler(state, action.error.message);
      }
    );
  },
});

export default appSlice;
