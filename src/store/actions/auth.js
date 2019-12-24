import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authstart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,localId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:localId
    }
}

export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authstart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuqmxsxb_U6mnvSSoyDb3MZeTEp9rXYCA';
        if(!isSignup){
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuqmxsxb_U6mnvSSoyDb3MZeTEp9rXYCA';
        }
        axios.post(url,authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    }
}