import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import ThunkMiddleware from "redux-thunk";
import { joinCampaign, updatePage, changePage, updateInfo } from "./utils/reducerFunction";

const JOIN_CAMPAIGN = "JOIN_CAMPAIGN";
const UPDATE_PAGE = "UPDATE_PAGE";
const SET_PAGE_CONTENT = "SET_PAGE_CONTENT";
const UPDATE_INFO = "UPDATE_INFO";

export const updateInfoData = (infoData) => {
  return {
    type: UPDATE_INFO,
    infoData,
  }
}

export const updatePageData = (pageData) => {
  return {
    type: UPDATE_PAGE,
    pageData,
  }
}

export const joinNewCampaign = (campaignName) => {
  return {
    type: JOIN_CAMPAIGN,
    campaignName,
  }
}

export const setPage = (content) => {
  return {
    type: SET_PAGE_CONTENT,
    content
  }
}

const initialTestState = {
  user: {id: 1, userName: "tishara", email:"topazdragon20@yahoo.com"},
  currentPage: {
    campaignName:"Avatar The Last Airbender My World", 
    jumps:["Summary", "Backstory", "Campaign Start", "Death"], 
    content: {},
    page: "pageTitle",
    pertInfo:["City: Human Town", "Parents: Unknown", "Class: Gambler", "Gender: Male", "Race: Tiefling", "Age: 28", "Description: Thin build, maroon Tiefling with shaved down horns. Wears a colorshifting cloak over a more ornate street attire"]},
  campaigns: [
    {id:1, campaignName: "Avatar The Last Airbender My World", pages:["Water Benders", "Fire Benders", "Earth Benders", "Air Benders", "Ashleys Pengu", "Oscars character", "Addy's Character", "Firebending Librarians"], members:["Alexis"]}, 
    {id:2, campaignName:"Guardians of Avalon", pages:["Therai", "Asterion", "Deznel", "Flan"], members:["Ashley", "Alexis", "Gabe", "Oscar", "Jared"]}],
}

const appReducer = (state = initialTestState, action) => {
  switch (action.type) {
    case JOIN_CAMPAIGN:
      return joinCampaign(state, action.campaignName);
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

export default createStore(appReducer, applyMiddleware(ThunkMiddleware, loggerMiddleware));