import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as webtoonActions from "../../redux/modules/webtoon";

export default connect(
  (state, ownProps) => ({
    newList: state.webtoon.toonList,
    isPending: state.webtoon.isPending,
    toonList: state.webtoon.toonList
  }),
  (dispatch, ownProps) => ({
    WebtoonActions: bindActionCreators(webtoonActions, dispatch)
  })
)(Container);
