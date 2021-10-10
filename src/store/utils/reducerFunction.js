
export const joinCampaign = (state, action) => {
  return action.campaignName;
}

export const updatePage = (state, pageData) => {
  const newState = {...state};
  newState.currentPage.textContent = pageData;
  newState.currentPage.jumps = [];
  pageData.blocks.forEach(
    (block) => {
      if(block.type === "header"){
        newState.currentPage.jumps.push(block.data.text);
      }
    }
  );
  return newState;
}

export const updateInfo = (state, infoData) => {
  console.log(infoData)
  const newState = {...state};
  newState.currentPage.pertInfo = infoData;
  return newState;
}

export const changePage = (state, content) => {
  const newState = {...state};
  newState.currentPage = {...content}
  newState.currentPage.jumps = [];
  content.textContent.blocks.forEach(
    (block) => {
      if(block.type === "header"){
        newState.currentPage.jumps.push(block.data.text);
      }
    }
  );
  return newState;
}