import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DrawerContent from "./presenter";
import * as userActions from "../../redux/modules/user";

export default connect(
  (state, ownProps) => ({
    isLoggedIn: state.user.isLoggedIn,
    name: state.user.name
  }),
  (dispatch, ownProps) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(DrawerContent);
