import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
//import * as recentActions from "../../redux/modules/recent";

export default connect(
  (state, ownProps) => ({
    recentList: state.recent.recentList,
    isPending: state.recent.isPending,
    name: state.user.name,
    id: state.user.id,
    token: state.user.token
  }),
  (dispatch, ownProps) => ({
    //RecentActions: bindActionCreators(recentActions, dispatch)
  })
)(Container);
