'use strict';

const e = React.createElement;

const wholeOptions = [{ value: 'whole', name: '모두' }];

const importanceOptions = [
  { value: 'importance-03', name: '매우중요' },
  { value: 'importance-02', name: '중요' },
  { value: 'importance-01', name: '보통' }
];

const completeOptions = [
  { value: 'complete', name: '완료' },
  { value: 'incomplete', name: '미완료' }
];

const dummyDatas = Array(4)
  .fill()
  .map((e, i) => ({
    id: i,
    importance: 'importance-03',
    text: `세탁소에서 세탁물 찾아오기-${i}`,
    date: '2021.04.01',
    complete: false
  }));

const Input = ({ onAddTask }) => {
  const [importance, setImportance] = React.useState('');
  const [text, setText] = React.useState('');
  const handleChangeImportance = (e) => {
    setImportance(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleAddTesk = () => {
    if (!importance) {
      alert('중요도를 선택해주세요');
      return;
    }
    onAddTask(importance, text);
  };

  return (
    <div className="todo__input">
      <select
        name="importance"
        id="importance"
        value={importance}
        className="todo__input--select"
        onChange={handleChangeImportance}
      >
        <option value="" disabled>
          중요도
        </option>
        {importanceOptions.map(({ value, name }, index) => (
          <option value={value} key={index}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={text}
        className="todo__input--input"
        placeholder="할 일을 입력하세요"
        onChange={handleChangeText}
      />
      <button
        className="todo__input--button"
        type="button"
        onClick={handleAddTesk}
      >
        추가
      </button>
    </div>
  );
};

const Filter = ({ selected, options, onSelectOption }) => {
  return (
    <div className="todo__filter">
      {options.map(({ value, name }, index) => (
        <button
          type="button"
          className={`todo__filter--button ${
            selected.includes(value) ? 'selected' : ''
          }`}
          key={index}
          onClick={() => onSelectOption(value)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

const ToDoList = ({ todos, onChangeComplete }) => {
  return (
    <ul className="todo__list">
      {todos.map((todo, index) => (
        <ToDoItem key={index} todo={todo} onChangeComplete={onChangeComplete} />
      ))}
    </ul>
  );
};

const ToDoItem = ({ todo, onChangeComplete }) => {
  const getImportance = (importance) => {
    return importanceOptions.filter(
      ({ value, name }) => value === importance
    )[0].name;
  };

  return (
    <li className="todo__item row-aligner">
      <input
        type="checkbox"
        className="todo__item--checkbox"
        onChange={() => onChangeComplete(todo.id)}
      />
      <div className="todo__item--info">
        <span>중요도 : {getImportance(todo.importance)}</span>
        <span>추가일 : {todo.date}</span>
        <p className={todo.complete ? 'complete' : ''}>{todo.text}</p>
      </div>
      <button type="button" className="todo__item--sorting-button"></button>
    </li>
  );
};

const App = () => {
  const [todos, setTodos] = React.useState(dummyDatas);
  const [importances, setImportances] = React.useState(['whole']);
  const [completes, setCompletes] = React.useState(['whole']);

  const handleAddTask = (importance, text) => {
    const newItem = {
      importance,
      text,
      id: todos.length,
      date: moment().format('YYYY.MM.DD'),
      complete: false
    };
    const newTodos = [...todos];
    newTodos.push(newItem);
    setTodos(newTodos);
  };

  const handleSelectImportant = (value) => {
    if (value === 'whole') {
      setImportances(['whole']);
    } else {
      const newImportance = [...importances].filter((e) => e !== 'whole');
      if (newImportance.includes(value)) {
        const arr = newImportance.filter((e) => e !== value);
        setImportances(arr.length === 0 ? ['whole'] : arr);
      } else {
        newImportance.push(value);
        setImportances(newImportance);
      }
    }
  };

  const handleSelectComplete = (value) => {
    if (value === 'whole') {
      setCompletes(['whole']);
    } else {
      const newCompletes = [...completes].filter((e) => e !== 'whole');
      if (newCompletes.includes(value)) {
        const arr = newCompletes.filter((e) => e !== value);
        setCompletes(arr.length === 0 ? ['whole'] : arr);
      } else {
        newCompletes.push(value);
        setCompletes(newCompletes);
      }
    }
  };

  const handleChangeComplete = (itemId) => {
    const newTodos = [...todos].map((e) => ({
      ...e,
      complete: e.id === itemId ? !e.complete : e.complete
    }));
    setTodos(newTodos);
  };

  const getTodoLIst = () => {
    const newImportantTodos = importances.includes('whole')
      ? todos
      : [...todos].filter(({ importance }) => importances.includes(importance));
    if (completes.includes('whole') || completes.length === 2) {
      return newImportantTodos;
    }
    return [...newImportantTodos].filter((e) =>
      completes.includes('complete') ? e.complete : !e.complete
    );
  };

  return (
    <div className="todo__wrapper">
      <Input onAddTask={handleAddTask} />
      <div className="todo__filter--wrapper">
        <Filter
          selected={importances}
          options={wholeOptions.concat(...importanceOptions)}
          onSelectOption={handleSelectImportant}
        />
        <Filter
          selected={completes}
          options={wholeOptions.concat(...completeOptions)}
          onSelectOption={handleSelectComplete}
        />
      </div>
      <ToDoList todos={getTodoLIst()} onChangeComplete={handleChangeComplete} />
    </div>
  );
};

const domContainer = document.getElementById('root');
ReactDOM.render(e(App), domContainer);
