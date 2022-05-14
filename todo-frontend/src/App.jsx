import { useState } from 'react'
import './base.css'
import './App.css'

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { IoCloseOutline } from 'react-icons/io5'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTasks((prevTasks) =>
      prevTasks.concat({ task: newTask, id: idGenerator(), checked: false })
    )
    setNewTask('')
  }

  const handleChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleCheck = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        if (task.checked == true) {
          task.checked = false
        } else {
          task.checked = true
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  const handleRemove = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  return (
    <main className='main'>
      <div className='background'></div>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h2 className='form__title'>TODO List</h2>
          <div className='form__content'>
            <input
              className='form__input'
              type='text'
              value={newTask}
              onChange={handleChange}
            />
            <button type='submit' className='form__button'>
              Add
            </button>
          </div>
        </form>

        <div className='list'>
          <div className='list__content'>
            {tasks.length ? (
              tasks.map((task) => (
                <div className='list__task' key={task.id}>
                  {task.checked ? (
                    <ImCheckboxChecked
                      className='list__check'
                      onClick={() => handleCheck(task.id)}
                    />
                  ) : (
                    <ImCheckboxUnchecked
                      className='list__check'
                      onClick={() => handleCheck(task.id)}
                    />
                  )}
                  <p
                    className={
                      task.checked
                        ? `list__text list__text-checked`
                        : `list__text`
                    }
                  >
                    {task.task}
                  </p>
                  <IoCloseOutline
                    className='list__remove'
                    onClick={() => handleRemove(task.id)}
                  />
                </div>
              ))
            ) : (
              <div className='list__task'>
                <p className='list__text'>Add your first task!</p>
              </div>
            )}
          </div>
          <div className='list__footer'>{tasks.length} tasks</div>
        </div>
      </div>
    </main>
  )
}

export default App
