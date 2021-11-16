
import CampaignPage from "./pages/CampaignPage";
import { makeStyles } from "@material-ui/core/styles"
import NavBar from './navigation/NavBar';
import HomePage from "./pages/HomePage";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/utils/ThunkCreator";
import { Auth } from 'aws-amplify';

const styles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
    color: "white",
    backgroundColor: "#282c40"
  }
}));

const MainPage = (props) => {
  const { userAccess, fetchUser } = props;
  
  const classes = styles();

  useEffect(() => {
    const fetchSub = async () => {
      const user = await Auth.currentUserInfo();
      const sub = user.attributes.sub;
      console.log(sub);
      fetchUser(sub);
    }
    fetchSub();
  },[fetchUser]);

  return (
    <div className = {classes.root}>
      <NavBar/>
      {userAccess?.currentCampaign === null ?
        <HomePage/>
        :
        <CampaignPage/>
      }
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    userAccess: state.userAccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{ 
    fetchUser: (sub) => {
      dispatch(fetchUser(sub));
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
