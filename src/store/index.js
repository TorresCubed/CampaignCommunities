import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import ThunkMiddleware from "redux-thunk";

import userAccess from "./userAccess";
import currentPage from "./currentPage";


// const initialTestState = {
//   user: {id: 1, userName: "tishara", email:"topazdragon20@yahoo.com"},
//   currentPage: {
//     campaignName:"Avatar The Last Airbender My World", 
//     jumps:["Summary", "Backstory", "Campaign Start", "Death"], 
//     textContent: {},
//     page: "pageTitle",
//     pertInfo:["City: Human Town", "Parents: Unknown", "Class: Gambler", "Gender: Male", "Race: Tiefling", "Age: 28", "Description: Thin build, maroon Tiefling with shaved down horns. Wears a colorshifting cloak over a more ornate street attire"]},
//   campaigns: [
//     {id:1, campaignName: "Avatar The Last Airbender My World", pages:["Water Benders", "Fire Benders", "Earth Benders", "Air Benders", "Ashleys Pengu", "Oscars character", "Addy's Character", "Firebending Librarians"], members:["Alexis"]}, 
//     {id:2, campaignName:"Guardians of Avalon", pages:["Therai", "Asterion", "Deznel", "Flan"], members:["Ashley", "Alexis", "Gabe", "Oscar", "Jared"]}],
// }


const appReducer = combineReducers({
  userAccess,
  currentPage,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default createStore(rootReducer, applyMiddleware(ThunkMiddleware, loggerMiddleware));

