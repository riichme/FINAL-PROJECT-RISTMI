import { DEC, INC, SET_NULL } from "./constants"

export const inc = (value) => {
    return {
        type: INC,
        cartCount: value
    }
}
export const dec = (value) => {
    return {
        type: DEC,
        cartCount: value
    }
}

export const set_null = (value) => {
    return {
        type: SET_NULL,
        cartCount: value
    }
}

export const removeUntilZero = (value) => {
    return (dispatch, getState) => {
        if(getState().counter.cartCount > 0){
            dispatch(dec(value))
        }
    }
}