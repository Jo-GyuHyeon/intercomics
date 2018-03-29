import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as rankActions from "../../redux/modules/rank";

export default connect(
  (state, ownProps) => ({
    rankList: state.rank.rankList,
    isPending: state.rank.isPending
  }),
  (dispatch, ownProps) => ({
    RankActions: bindActionCreators(rankActions, dispatch)
  })
)(Container);
