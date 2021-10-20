import { setPage } from "../currentPage";
import Amplify, { API } from 'aws-amplify'
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);


export const backUpPage = async(pageData) =>  {
  const apiName = "campaignPageRetrievalAPI";
  const path = `/pages/${pageData.campaign}/${pageData.page}`;
  const myInit = {
    body: pageData,
    headrs: {}
  }

  try{
    const response = await API.put(apiName, path, myInit);
    console.log(response);
  } catch(error) {
    console.log(error);
  }
};

export const fetchPageContent = (campaignID, pageName) => async (dispatch) => {
  console.log(campaignID);
  console.log(pageName);
  const apiName = "campaignPageRetrievalAPI";
  const path = `/pages/${campaignID}/${pageName}`
  // const path = `/pages/1/RedBarrons`
  const myInit = {
    headers:{},
  }

  try{
    const response = await API.get(apiName, path, myInit);
    dispatch(setPage(response));
  } catch(error) {
    console.log(error);
  }
};

