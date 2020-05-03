import AddNewList from '../components/AddNewList'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { addNewList } from '../actions/actionLists';
import { openPanelAddList } from '../actions/actionStateApp';


function mapStateToProps({ lists, colors, stateApp }) {
    return {
        lists,
        colors,
        isOpenPanelAddList: stateApp.isOpenPanelAddList,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addNewList,
        openPanelAddList,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewList);
