import React, { useEffect } from 'react';
import './App.css';
import Leftpanel from './component/Leftpanel'
import axios from 'axios'
import ContentPanel from './component/Contentpanel'
import { Route, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLists, onActivItem, toggleLoadingList } from './actions/index';


const App = ({ setLists, lists, activitem, onActivItem, loadingList, toggleLoadingList }) => {
  const history = useHistory();

  useEffect(() => {
    async function getAllData() {
      const Promislists = axios
        .get('http://5e82e1d178337f00160ae6e7.mockapi.io/lists')
        .then(({ data }) => data);
      const Promistasks = axios
        .get('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks')
        .then(({ data }) => data);
      const Promiscolors = axios
        .get('http://5e82e1d178337f00160ae6e7.mockapi.io/colors')
        .then(({ data }) => data);
      const allLists = await Promislists;
      const allTasks = await Promistasks;
      const allColors = await Promiscolors;
      const state = allLists.map(item => {
        return { ...item, tasks: allTasks.filter(task => Number(task.listId) === Number(item.id)), color: allColors.filter(color => Number(color.id) === Number(item.colorId))[0] }
      })
      setLists(state);
      toggleLoadingList(false);
      return
    }

    getAllData()

  }, []);

  useEffect(() => {
    const id = history.location.pathname.split('lists/')[1];

    if (lists) {
      const activ = lists.find(li => li.id === id);

      if (activ === undefined) {
        history.push('/')
      }

      onActivItem(activ)
    }

  }, [lists, history.location.pathname])


  return (
    < div className='App' >
      <Route exact path='/'>
        {!loadingList ? <Leftpanel /> : 'Загрузка'}
        <div className="contentAll">
          {!loadingList ? lists.map((item, index) => {
            return <ContentPanel key={index} item={item} empty={true} />
          })
            : 'Загрузка'}
        </div>
      </Route>


      <Route path='/lists'>
        {!loadingList ? <Leftpanel /> : 'Загрузка'}
        {!loadingList ? <ContentPanel item={activitem} /> : 'Загрузка'}
      </Route>
    </div >
  );
}


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
    onActivItem,
    toggleLoadingList
  }, dispatch)
}

App.propTypes = {
  setLists: PropTypes.func,
  lists: PropTypes.array,
  activitem: PropTypes.object,
  onActivItem: PropTypes.func,
  loadingList: PropTypes.bool,
  toggleLoadingList: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

