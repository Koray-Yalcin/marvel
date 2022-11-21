import * as userTypes from '../actionTypes/userActionTypes';
import * as api from '../../api/userApi';

const registerStart = () => ({
    type: userTypes.REGISTER_START,
});

const registerSuccess = (user) => ({
    type: userTypes.REGISTER_SUCCESS,
    payload: user
});

const registerFail = (user) => ({
    type: userTypes.REGISTER_FAIL,
    payload: user
});

const loginStart = () => ({
  type: userTypes.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: userTypes.LOGIN_SUCCESS,
  payload: user
});

const loginFail = (user) => ({
  type: userTypes.LOGIN_FAIL,
  payload: user
});

  export const registerInitiate = (registerValues) => async (dispatch) => {
      dispatch(registerStart());
      try {
        await api.signup(registerValues).then((response) => {
          const data = response.data.createdUser;
          dispatch(registerSuccess(data));
        })
      } catch (error) {
        dispatch(registerFail(error.message));
    };
  };

  export const loginInitiate = (loginValues) => async (dispatch) => {
    dispatch(loginStart());
    try {
      await api.signin(loginValues).then((response) => {
        const data = response.data.user;
        dispatch(loginSuccess(data));
        localStorage.setItem('user', JSON.stringify(data));
      })
    } catch (error) {
      dispatch(loginFail(error.message));
  };
};