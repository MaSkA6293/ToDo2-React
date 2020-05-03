
import App from '../components/App'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLists } from '../actions/actionLists';
import { onActivItem, openPanelAddList, toggleLoadingList } from '../actions/actionStateApp';
import { setColors } from '../actions/actionColors';

function mapStateToProps(store) {
  return {
    lists: store.lists,
    activitem: store.stateApp.activitem,
    loadingList: store.stateApp.loadingList,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLists,
    setColors,
    onActivItem,
    toggleLoadingList,
    openPanelAddList,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

