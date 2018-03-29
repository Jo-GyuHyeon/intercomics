import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as notificationActions from "../../redux/modules/notification";

export default connect(
  (state, ownProps) => ({
    notificationList: state.notification.notificationList,
    isPending: state.notification.isPending
  }),
  (dispatch, ownProps) => ({
    NotificationActions: bindActionCreators(notificationActions, dispatch)
  })
)(Container);
