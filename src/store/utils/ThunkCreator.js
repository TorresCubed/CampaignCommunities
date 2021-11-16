import { setPage } from "../currentPage";
import { API } from 'aws-amplify';


export const createCampaign = (userId, campaignData, userAccess) => async(dispatch) => {
  const campaignId = campaignData.campaignId;
  const apiName = "userAccessAPI";
  const userPath = `/${userId}`;
  const campaignPath = `/campaign/${campaignId}`;
  const userData = {
    userId: userId,
    pendingInvites: [],
    activeCampaigns: [
      {[campaignData.campaignId]:campaignData.campaignName}
    ]}
  const campaignInit = {
    body: campaignData,
    headers:{}
  }
  const userInit = {
    body: userData,
    headers: {}
  }
  console.log(userInit)
  console.log(campaignInit)

  try{
    let userResponse = null;
    if(userAccess?.campaigns) {
      userResponse = await API.update()
    } else {
      userResponse = await API.post(apiName, userPath, userInit)
    }
    const res = await API.post(apiName, campaignPath, campaignInit);
    console.log(userResponse);
    console.log(res);
  } catch (error) {
    console.log(error);
  }

}

export const backUpPage = async(pageData) =>  {
  const apiName = "campaignPageRetrievalAPI";
  const path = `/pages/${pageData.campaign}/${pageData.page}`;
  const myInit = {
    body: pageData,
    headrs: {}
  }

  try{
    await API.put(apiName, path, myInit);
  } catch(error) {
    console.log(error);
  }
};

export const fetchUser = (sub) => async (dispatch) => {
  
}

export const fetchPageContent = (campaignID, pageName) => async (dispatch) => {
  const apiName = "campaignPageRetrievalAPI";
  const path = `/pages/${campaignID}/${pageName}`
  const myInit = {
    headers:{},
  }

  try{
    const response = await API.get(apiName, path, myInit);
    if(!response?.page) return;
    dispatch(setPage(response));
  } catch(error) {
    console.log(error);
  }
};

