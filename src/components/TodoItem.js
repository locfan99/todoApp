import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { dltTodo, upTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModal from './TodoModal';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleDlt = () => {
    dispatch(dltTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  };
  const handleUp = () => {
    setUpdateModalOpen(true);
  };
  useEffect(() => {
    if (todo.status === 'complete') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, []);

  const checkUpdate = () => {
    setCheck(!check);
    dispatch(upTodo({ ...todo, status: check ? 'incomplete' : 'complete' }));
  };
  return (
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        <div>
          <input
            onClick={() => {
              checkUpdate();
            }}
            type="checkbox"
            defaultChecked={
              check === true || todo.status === 'complete' ? 'checked' : ''
            }
          />
        </div>
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              todo.status === 'complete' && styles['todoText--completed'],
            ])}
          >
            {todo.title}
          </p>
          <p className={styles.time}>
            {format(new Date(todo.time), 'p, dd/MM  /yyyy')}
          </p>
        </div>
      </div>{' '}
      <div className={styles.todoActions}>
        <div
          onClick={handleDlt}
          onKeyDown={handleDlt}
          role="button"
          tabIndex={0}
          className={styles.icon}
        >
          <MdDelete />
        </div>
        <div
          onClick={handleUp}
          onKeyDown={handleUp}
          role="button"
          tabIndex={0}
          className={styles.icon}
        >
          <MdEdit />
        </div>
      </div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </div>
  );
}

export default TodoItem;
