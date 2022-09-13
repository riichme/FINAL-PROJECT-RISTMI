// Import All Cart Constants Type
import {
    ERROR_FETCHING_PRODUCT,
    NEXT_PAGE,
    PREV_PAGE,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_PAGE,
    SET_TAGS,
    START_FETCHING_PRODUCT,
    SUCCESS_FETCHING_PRODUCT,
    TOGGLE_TAG,
  } from "./constants";

const statusList = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
  };

//  Initial State from Product Reducer
// Similar to useState but globally state
const initialState = {
    data: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 8,
    keyword: "",
    category: "",
    tags: [],
    status: statusList.idle,
}

// Auth Reducer
const productReducer = (
    state = initialState, 
    { type, payload}) => 
    {
        switch (type) {
            // Start of Fetching API Product
            case START_FETCHING_PRODUCT:
                return { ...state, status: statusList.process};
            // Error of Fetching API Product
            case ERROR_FETCHING_PRODUCT: 
                return { ...state, status: statusList.error};
            // Success of Fetching API Product
            case SUCCESS_FETCHING_PRODUCT: 
                return {...state,
                    status: statusList.success,
                    data: payload.data,
                    totalItems: payload.count,
                };
            case SET_PAGE:
                return { ...state, currentPage: payload.currentPage };
            case SET_KEYWORD:
                return { ...state, keyword: payload.keyword };
            case SET_CATEGORY:
                return {
                    ...state,
                    currentPage: 1,
                    tags: [],
                    category: payload.category,
                    keyword: "",
                };
            case SET_TAGS:
                return { ...state, tags: payload.tags };
            case NEXT_PAGE:
                return { ...state, currentPage: state.currentPage + 1 };
            case PREV_PAGE:
                return { ...state, currentPage: state.currentPage - 1 };
            case TOGGLE_TAG:
                // If there isn't a tag from payload in state tags
                // Push the payload tag into state tags
                return !state.tags.includes(payload.tag)
                    ? { ...state, currentPage: 1, tags: [...state.tags, payload.tag] }
                    // If there's a tag from payload in state tags
                    // Remove the tag from state tags
                    : {
                        ...state,
                        currentPage: 1,
                        tags: state.tags.filter((tag) => tag !== payload.tag),
                    };
            // If no dispotch triggers, state will not be changed
            default:
                return state;
        }
}

export default productReducer;