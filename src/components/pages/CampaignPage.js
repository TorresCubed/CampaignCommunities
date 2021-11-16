import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";
import PageContent from "./PageContent";
import CampaignLanding from "./CampaignLanding";

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  pertInfo: {
    zIndex: 10000
  },
}));

const CampaignPage = (props) => {
  const classes = styles();

  const { currentPage } = props;
  
  return (
    <div className={classes.container}>
      {currentPage?.page !== null ? 
        <PageContent/> 
          :
        <CampaignLanding/>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(CampaignPage);

