import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FooterModal from "./presenter";

export default connect(
  (state, ownProps) => ({
    platformList: state.initialize.platformList
  }),
  null
)(FooterModal);
