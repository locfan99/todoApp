import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelecButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { selectTodo } from '../slices/todoSlice';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const filterTodo = useSelector((state) => state.todo.filterTodo);
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    dispatch(selectTodo(e.target.value));
  };
  return (
    <div className={styles.appHeader}>
      <Button onClick={() => setModalOpen(true)} variant="primary">
        Add Task
      </Button>
      <SelecButton id="status" value={filterTodo} onChange={handleSelect}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelecButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
