import { updatePage, changePage, updateInfo, clearCurrentCampaign } from "./utils/reducerFunction";


const UPDATE_PAGE = "UPDATE_PAGE";
const SET_PAGE_CONTENT = "SET_PAGE_CONTENT";
const UPDATE_INFO = "UPDATE_INFO";
const CLEAR_CURRENTPAGE = "CLEAR_CURRENTPAGE";

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

export const clearPage = (campaignId) => {
  return {
    type: CLEAR_CURRENTPAGE,
    campaignId,
  };
};

const initialTestState = {
    campaign: null,
    jumps:[], 
    textContent: {},
    page: null,
    pertInfo:[]
}

const reducer = (state = initialTestState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return updatePage(state, action.pageData);
    case SET_PAGE_CONTENT:
      return changePage(state, action.content);
    case UPDATE_INFO:
      return updateInfo(state, action.infoData);
    case CLEAR_CURRENTPAGE:
      return clearCurrentCampaign(state, action.campaignId);
    default:
      return state
  }
} 

export default reducer;
