import { joinCampaign } from "./utils/reducerFunction";



const JOIN_CAMPAIGN = "JOIN_CAMPAIGN";

export const joinNewCampaign = (campaignName) => {
  return {
    type: JOIN_CAMPAIGN,
    campaignName,
  }
}

const initialTestState = {
  currentCampaign: 1,
  campaigns:{
    1: 
      {
        campaignName: "Avatar The Last Airbender My World", 
        pages:["Therai", "RedBarrons",], 
        members:["Alexis"]
      }, 
    2: 
      {
        campaignName:"Guardians of Avalon", 
        pages:["Tordek", "RedBarrons"], 
        members:["Ashley", "Alexis", "Gabe", "Oscar", "Jared"]
      }
  }
}


const reducer = (state = initialTestState, action) => {
  switch (action.type) {
    case JOIN_CAMPAIGN:
      return joinCampaign(state, action.campaignName);
    default:
      return state
  }
} 

export default reducer;

