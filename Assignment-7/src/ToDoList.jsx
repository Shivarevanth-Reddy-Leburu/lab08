// ToDoList.jsx
import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isTaskEditing, setIsTaskEditing] = useState(null);
  const [editTaskAndSave, setEditTaskAndSave] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setIsTaskEditing(index);
    setEditTaskAndSave(tasks[index].text);
  };

  const saveTaskOnEdit = (e) => {
    setEditTaskAndSave(e.target.value);
  };

  const saveAfterEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editTaskAndSave } : task
    );
    setTasks(updatedTasks);
    setIsTaskEditing(null);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new Task"
        />
        <button className='addButton' type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {isTaskEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editTaskAndSave}
                  onChange={saveTaskOnEdit}
                  className="edit-input"
                />
                <button onClick={() => saveAfterEdit(index)} className="save-button">Save</button>
              </div>
            ) : (
              <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
            )}
            <button onClick={() => editTask(index)} className="edit-button">Edit</button>
            <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
