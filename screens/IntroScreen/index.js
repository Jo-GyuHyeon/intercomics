import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IntroScreen from "./presenter";
import * as userActions from "../../redux/modules/user";

export default connect(
  (state, ownProps) => ({
    isIntro: state.user.isIntro
  }),
  (dispatch, ownProps) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(IntroScreen);
