
export const joinCampaign = (state, action) => {
  return action.campaignName;
}

export const updatePage = (state, pageData) => {
  const newState = {...state};
  newState.textContent = pageData;
  newState.jumps = [];
  pageData.blocks.forEach(
    (block) => {
      if(block.type === "header"){
        newState.jumps.push({text:block.data.text, id:block.id});
      }
    }
  );
  return newState;
}

export const updateInfo = (state, infoData) => {
  const newState = {...state};
  newState.pertInfo = infoData;
  return newState;
}

export const changePage = (state, content) => {
  const newState = {...state};
  newState.page = content.page;
  newState.textContent = content.textContent;
  newState.campaign = content.campaign;
  newState.pertInfo = content.pertInfo;
  newState.jumps = [];
  if(content.textContent?.blocks){
    content.textContent.blocks.forEach(
      (block) => {
        if(block.type === "header"){
          newState.jumps.push({text:block.data.text, id:block.id});
        }
      }
    );
  }
  return newState;
}