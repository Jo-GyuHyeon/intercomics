import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as webtoonActions from "../../redux/modules/webtoon";
import * as episodeActions from "../../redux/modules/episode";
import * as recentActions from "../../redux/modules/recent";
import * as initializeActions from "../../redux/modules/initialize";
import * as rankActions from "../../redux/modules/rank";
import * as subscribeActions from "../../redux/modules/subscribe";
import AppContainer from "./presenter";

export default connect(
  (state, ownProps) => ({
    isLoggedIn: state.user.isLoggedIn,
    isPendding: state.initialize.isPendding,
    id: state.user.id,
    token: state.user.token,
    name: state.user.name
  }),
  (dispatch, ownProps) => ({
    //웹툰리스트
    //구독
    //랭크
    WebtoonActions: bindActionCreators(webtoonActions, dispatch),
    InitializeActions: bindActionCreators(initializeActions, dispatch),
    EpisodeActions: bindActionCreators(episodeActions, dispatch),
    RecentActions: bindActionCreators(recentActions, dispatch),
    RankActions: bindActionCreators(rankActions, dispatch),
    SubscribeActions: bindActionCreators(subscribeActions, dispatch)
  })
)(AppContainer);
