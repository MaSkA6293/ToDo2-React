import React, { useEffect } from 'react';
import './App.scss';
import Leftpanel from '../../containers/Leftpanel'
import axios from 'axios'
import ContentPanels from '../../containers/Contentpanel'
import { Route, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const App = ({ setLists, lists, activitem, onActivItem, loadingList, toggleLoadingList, setColors, openPanelAddList }) => {
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
        return {
          ...item,
          tasks: allTasks.filter(task => Number(task.listId) === Number(item.id)),
          color: allColors.filter(color => Number(color.id) === Number(item.colorId))[0]
        }
      })
      setLists(state);
      setColors(allColors);
      toggleLoadingList(false);
    }
    getAllData()
  }, []);

  useEffect(() => {
    const id = history.location.pathname.split('lists/')[1];
    if (lists) {
      const activ = lists.find(li => Number(li.id) === Number(id));
      if (!activ) {
        history.push('/')
        onActivItem(null)
      }
      else {
        onActivItem(activ);
        openPanelAddList(false)
      }
    }
  }, [lists, history.location.pathname])

  return (
    < div className='App' >
      <Route exact path='/'>
        {!loadingList ? <Leftpanel /> : 'Загрузка'}
        <div className="App__contentAll">
          {!loadingList ? lists.map((item, index) => {
            return <ContentPanels key={index} item={item} empty={true} />
          })
            : 'Загрузка'}
        </div>
      </Route>
      <Route path='/lists'>
        {!loadingList ? <Leftpanel /> : 'Загрузка'}
        {!loadingList ? <ContentPanels item={activitem} /> : 'Загрузка'}
      </Route>
    </div >
  );
}

App.propTypes = {
  setLists: PropTypes.func,
  setColors: PropTypes.func,
  lists: PropTypes.array,
  activitem: PropTypes.object,
  onActivItem: PropTypes.func,
  loadingList: PropTypes.bool,
  toggleLoadingList: PropTypes.func,
  openPanelAddList: PropTypes.func,
};

export default App;

