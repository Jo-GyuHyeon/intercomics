import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as webtoonActions from "../../redux/modules/webtoon";
import * as recentActions from "../../redux/modules/recent";

export default connect(
  (state, ownProps) => ({
    toonList: state.webtoon.toonList,
    isPending: state.webtoon.isPending
  }),
  (dispatch, ownProps) => ({
    WebtoonActions: bindActionCreators(webtoonActions, dispatch),
    RecentActions: bindActionCreators(recentActions, dispatch)
  })
)(Container);
