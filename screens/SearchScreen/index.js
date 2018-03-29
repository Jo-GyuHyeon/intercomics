import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as searchActions from "../../redux/modules/search";

export default connect(
  (state, ownProps) => ({
    searchList: state.search.searchList,
    isPending: state.search.isPending,
    isLast: state.search.isLast
  }),
  (dispatch, ownProps) => ({
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
)(Container);
