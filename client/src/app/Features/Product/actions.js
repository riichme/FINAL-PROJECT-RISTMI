// Import Fetch API to get all products
import { getProducts } from "../../api/product";

// Import debounce to give delay of fetching product
import debounce from "debounce-promise";

// Import Types of Action (constants)
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

// Give delay or debouncing from fetching product 1 second
let debounceFetchProduct = debounce(getProducts, 1000); // in miliseconds

// Export all actions
export const startFetchingProduct = () => ({
    type: START_FETCHING_PRODUCT,
  });
export const errorFetchingProduct = () => ({
  type: ERROR_FETCHING_PRODUCT,
});
export const successFetchingProduct = (payload) => ({
  type: SUCCESS_FETCHING_PRODUCT,
  payload,
});
export const setPage = (number = 1) => ({
  type: SET_PAGE,
  payload: {
    currentPage: number,
  },
});
export const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  payload: {
    keyword: keyword,
  },
});
export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: {
    category,
  },
});
export const setTags = (tags) => ({
  type: SET_TAGS,
  payload: {
    tags,
  },
});
export const toggleTag = (tag) => ({
  type: TOGGLE_TAG,
  payload: {
    tag,
  },
});
export const goToNextPage = () => ({
  type: NEXT_PAGE,
});
export const goToPrevPage = () => ({
  type: PREV_PAGE,
});
  
export const fetchProduct = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProduct()); // trigger begin of fetching product
        // Initializing parameter
        let perPage = getState().product.perPage || 9;
        let currentPage = getState().product.currentPage || 1;
        let tags = getState().product.tags || [];
        let keyword = getState().product.keyword || "";
        let category = getState().product.category || "";
        const params = {
          limit: perPage,
          skip:( currentPage * perPage ) - perPage,
          q: keyword,
          tags,
          category,
        };
        try {
            // Fetching Product
            let { data: { data, count }} = await debounceFetchProduct(params);
            dispatch(successFetchingProduct({data, count})); // trigger success of fetching product
        } catch (error) { // If error exists
            dispatch(errorFetchingProduct()); // trigger error of fetching product
        }
    }
}


