import React, { useState, useEffect } from 'react';
import './App.css';
import Leftpanel from './component/Leftpanel'
import contextToDo from './component/context'
import axios from 'axios'
import ContentPanel from './component/Contentpanel'
import List from './component/Leftpanel/List';
const App = () => {

  const [list, setlist] = useState(null);
  const [colors, setcolors] = useState(null);
  const [activItem, setactivItem] = useState(null)
  const [isOpenPanel, setisOpenPanel] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setlist(data);
        setactivItem(data[0])

      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setcolors(data);
    });
  }, []);



  const deletItem = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      axios.delete('http://localhost:3001/lists/' + id)
      setlist(list.filter(item => item.id !== +id))
    }
  }

  const addNewItem = (obj) => {
    const newList = [...list, obj];
    setlist(newList)
  }

  const activItemList = (id) => {
    setactivItem(id);
    setisOpenPanel(false);

  }

  const setNewItemName = (id, name) => {
    const newList = list.map(item => {
      if (item.id === id) {
        item.name = name
      }
      return item
    })
    setlist(newList);
    axios.patch('http://localhost:3001/lists/' + id, { name: name }).catch(() => {
      alert('Не удалось обновить название списка');
    })
  }



  const setStatusItem = (listid, id, status) => {
    const newList = list.map(item => {
      if (item.id === listid) {
        item.tasks.map(task => {
          if (task.id === id) {
            task.completed = status
          }
          return item
        })
      }
      return item
    })
    setlist(newList);

    axios.patch('http://localhost:3001/tasks/' + id, { completed: status }).catch(() => {
      alert('Не удалось обновить статус задачи не удалось');
    })

  }
  const addTask = (obj) => {
    setisLoading(true)
    axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
      const newList = list.map(item => {
        if (item.id === obj.listId) {
          item.tasks = [...item.tasks, data]
        }
        return item
      })
      setlist(newList)
    }).catch(() => {
      alert('Не удалось добавить задачу');
    }).finally(() => { setisLoading(false); setisOpenPanel(false) })



  }

  return (
    < div className='App' >
      <contextToDo.Provider value={{ list, colors, activItem, delet: deletItem, add: addNewItem, activ: activItemList, setNewItemName: setNewItemName, setNewStatus: setStatusItem, addTask: addTask, isOpenPanel, setisOpenPanel, isLoading, setlist }}>
        <Leftpanel />
        {list && activItem ? <ContentPanel /> : ''}
      </contextToDo.Provider>
    </div >
  );
}

export default App
