import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as episodeActions from "../../redux/modules/episode";

export default connect(
  (state, ownProps) => ({
    isPending: state.episode.isPending,
    episodeList: state.episode
  }),
  (dispatch, ownProps) => ({
    EpisodeActions: bindActionCreators(episodeActions, dispatch)
  })
)(Container);
