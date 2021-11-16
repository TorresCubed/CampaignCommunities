import { 
  joinCampaign,
  setActiveCampaign
} from "./utils/reducerFunction";



const JOIN_CAMPAIGN = "JOIN_CAMPAIGN";
const SET_CAMPAIGN = "SET_CAMPAIGN"

export const joinNewCampaign = (campaignName) => {
  return {
    type: JOIN_CAMPAIGN,
    campaignName,
  };
};

export const setCampaign = (campaignId) => {
  return {
    type: SET_CAMPAIGN,
    campaignId,
  };
};

const initialTestState = {
  currentCampaign: null,
  // campaigns:{
  //   1: 
  //     {
  //       campaignName: "Avatar The Last Airbender My World", 
  //       pages:["Therai", "RedBarrons",], 
  //       members:["Alexis"]
  //     }, 
  //   2: 
  //     {
  //       campaignName:"Guardians of Avalon", 
  //       pages:["Tordek", "RedBarrons"], 
  //       members:["Ashley", "Alexis", "Gabe", "Oscar", "Jared"]
  //     }
  // }
}


const reducer = (state = initialTestState, action) => {
  switch (action.type) {
    case JOIN_CAMPAIGN:
      return joinCampaign(state, action.campaignName);
    case SET_CAMPAIGN: 
      return setActiveCampaign(state, action.campaignId)
    default:
      return state
  }
} 

export default reducer;

