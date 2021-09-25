
export const joinCampaign = (state, action) => {
  return action.campaignName;
}

export const  updatePage = (state, pageData) => {
  const newState = {...state};
  newState.currentPage.content = pageData;
  return newState;
}