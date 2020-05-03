import Leftpanel from '../components/Leftpanel'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { del } from '../actions/actionLists';
import { onActivItem } from '../actions/actionStateApp';


function mapStateToProps({ lists, colors }) {
    return {
        list: lists,
        colors: colors,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        del: del,
        onActivItem,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Leftpanel);

