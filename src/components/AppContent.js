import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  const { filterTodo } = useSelector((state) => state.todo);
  const filterTodoList = sortedTodoList.filter((item) => {
    if (filterTodo === 'all') {
      return true;
    }
    return item.status === filterTodo;
  });

  return (
    <div>
      {filterTodoList && filterTodoList.length > 0
        ? filterTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'not found'}
    </div>
  );
}

export default AppContent;
