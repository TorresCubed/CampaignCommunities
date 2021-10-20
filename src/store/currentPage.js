import { updatePage, changePage, updateInfo } from "./utils/reducerFunction";


const UPDATE_PAGE = "UPDATE_PAGE";
const SET_PAGE_CONTENT = "SET_PAGE_CONTENT";
const UPDATE_INFO = "UPDATE_INFO";

export const updateInfoData = (infoData) => {
  return {
    type: UPDATE_INFO,
    infoData,
  };
};

export const updatePageData = (pageData) => {
  return {
    type: UPDATE_PAGE,
    pageData,
  };
};

export const setPage = (content) => {
  return {
    type: SET_PAGE_CONTENT,
    content
  };
};

const initialTestState = {
    campaign: 1,
    jumps:["Summary", "Backstory", "Campaign Start", "Death"], 
    textContent: {},
    page: "pageTitle",
    pertInfo:["City: Human Town", "Parents: Unknown", "Class: Gambler", "Gender: Male", "Race: Tiefling", "Age: 28", "Description: Thin build, maroon Tiefling with shaved down horns. Wears a colorshifting cloak over a more ornate street attire"]
}

const reducer = (state = initialTestState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return updatePage(state, action.pageData);
    case SET_PAGE_CONTENT:
      return changePage(state, action.content);
    case UPDATE_INFO:
      return updateInfo(state, action.infoData);
    default:
      return state
  }
} 

export default reducer;
