import { setPage } from "../index";
import Amplify, { API } from 'aws-amplify'
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);


export const backUpPage = async(pageData) =>  {
  console.log("puddin");
  console.log(pageData);
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

export const fetchPageContent = () => async (dispatch) => {
  const apiName = "campaignPageRetrievalAPI";
  // const path = `/pages/${campaignID}/${page}`
  const path = `/pages/1/RedBarrons`
  const myInit = {
    headers:{},
  }

  try{
    const response = await API.get(apiName, path, myInit);
    console.log(response);
    dispatch(setPage(response));
  } catch(error) {
    console.log(error);
  }
};

