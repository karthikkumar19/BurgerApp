import * as actiontypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return{
        type:actiontypes.ADD_INGREDIENTS,
        ingredientName:name
    }
}

export const removeIngredient = (name) => {
    return{
        type:actiontypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}

export const setIngredients = (ingredients) => {
    return{
        type:actiontypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}


export const fetchIngredientsFailed = () =>{
    return{
        type:actiontypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://react-my-burger-2c7f5.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data));
               
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    }
}