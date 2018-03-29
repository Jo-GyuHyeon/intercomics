import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as subscribeActions from "../../redux/modules/subscribe";

export default connect(
  (state, ownProps) => ({
    subscribeList: state.subscribe.subscribeList,
    isPending: state.subscribe.isPending
  }),
  (dispatch, ownProps) => ({
    SubscribeActions: bindActionCreators(subscribeActions, dispatch)
  })
)(Container);
