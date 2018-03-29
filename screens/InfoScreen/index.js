import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as userActions from "../../redux/modules/user";

export default connect(
  (state, ownProps) => ({
    isPending: state.user.isPending,
    email: state.user.email,
    name: state.user.name,
    statistics: state.user.statistics
  }),
  (dispatch, ownProps) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Container);
