import * as userTypes from '../actionTypes/userActionTypes';

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.REGISTER_START:
        case userTypes.LOGIN_START:
            return {...state, loading: true};
        case userTypes.REGISTER_SUCCESS:
        case userTypes.LOGIN_SUCCESS:
            return {...state, loading: false, currentUser: action.payload};
        case userTypes.REGISTER_FAIL:
        case userTypes.LOGIN_FAIL:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default userReducer;