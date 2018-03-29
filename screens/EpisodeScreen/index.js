import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./container";
import * as episodeActions from "../../redux/modules/episode";
import * as subscribeActions from "../../redux/modules/subscribe";
import * as recentActions from "../../redux/modules/recent";

export default connect(
  (state, ownProps) => ({
    isPending: state.episode.isPending,
    isSubscribe: state.episode.isSubscribe,
    isLast: state.episode.isLast,
    lastNum: state.episode.lastNum,
    episodeList: state.episode,
    recentEpisodeNo: state.episode.recentEpisodeNo
  }),
  (dispatch, ownProps) => ({
    SubscribeActions: bindActionCreators(subscribeActions, dispatch),
    EpisodeActions: bindActionCreators(episodeActions, dispatch),
    RecentActions: bindActionCreators(recentActions, dispatch)
  })
)(Container);
