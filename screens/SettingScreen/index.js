import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as userActions from "../../redux/modules/user";

export default connect(
  (state, ownProps) => ({
  }),
  (dispatch, ownProps) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Container);
