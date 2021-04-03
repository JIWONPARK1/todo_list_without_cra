'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var e = React.createElement;

var wholeOptions = [{ value: 'whole', name: '모두' }];

var importanceOptions = [{ value: 'importance-03', name: '매우중요' }, { value: 'importance-02', name: '중요' }, { value: 'importance-01', name: '보통' }];

var completeOptions = [{ value: 'complete', name: '완료' }, { value: 'incomplete', name: '미완료' }];

var dummyDatas = Array(4).fill().map(function (e, i) {
  return {
    id: i,
    importance: 'importance-03',
    text: '\uC138\uD0C1\uC18C\uC5D0\uC11C \uC138\uD0C1\uBB3C \uCC3E\uC544\uC624\uAE30-' + i,
    date: '2021.04.01',
    complete: false
  };
});

var Input = function Input(_ref) {
  var onAddTask = _ref.onAddTask;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      importance = _React$useState2[0],
      setImportance = _React$useState2[1];

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      text = _React$useState4[0],
      setText = _React$useState4[1];

  var handleChangeImportance = function handleChangeImportance(e) {
    setImportance(e.target.value);
  };

  var handleChangeText = function handleChangeText(e) {
    setText(e.target.value);
  };

  var handleAddTesk = function handleAddTesk() {
    if (!importance) {
      alert('중요도를 선택해주세요');
      return;
    }
    onAddTask(importance, text);
  };

  return React.createElement(
    'div',
    { className: 'todo__input' },
    React.createElement(
      'select',
      {
        name: 'importance',
        id: 'importance',
        value: importance,
        className: 'todo__input--select',
        onChange: handleChangeImportance
      },
      React.createElement(
        'option',
        { value: '', disabled: true },
        '\uC911\uC694\uB3C4'
      ),
      importanceOptions.map(function (_ref2, index) {
        var value = _ref2.value,
            name = _ref2.name;
        return React.createElement(
          'option',
          { value: value, key: index },
          name
        );
      })
    ),
    React.createElement('input', {
      type: 'text',
      value: text,
      className: 'todo__input--input',
      placeholder: '\uD560 \uC77C\uC744 \uC785\uB825\uD558\uC138\uC694',
      onChange: handleChangeText
    }),
    React.createElement(
      'button',
      {
        className: 'todo__input--button',
        type: 'button',
        onClick: handleAddTesk
      },
      '\uCD94\uAC00'
    )
  );
};

var Filter = function Filter(_ref3) {
  var selected = _ref3.selected,
      options = _ref3.options,
      onSelectOption = _ref3.onSelectOption;

  return React.createElement(
    'div',
    { className: 'todo__filter' },
    options.map(function (_ref4, index) {
      var value = _ref4.value,
          name = _ref4.name;
      return React.createElement(
        'button',
        {
          type: 'button',
          className: 'todo__filter--button ' + (selected.includes(value) ? 'selected' : ''),
          key: index,
          onClick: function onClick() {
            return onSelectOption(value);
          }
        },
        name
      );
    })
  );
};

var ToDoList = function ToDoList(_ref5) {
  var todos = _ref5.todos,
      onChangeComplete = _ref5.onChangeComplete;

  return React.createElement(
    'ul',
    { className: 'todo__list' },
    todos.map(function (todo, index) {
      return React.createElement(ToDoItem, { key: index, todo: todo, onChangeComplete: onChangeComplete });
    })
  );
};

var ToDoItem = function ToDoItem(_ref6) {
  var todo = _ref6.todo,
      onChangeComplete = _ref6.onChangeComplete;

  var getImportance = function getImportance(importance) {
    return importanceOptions.filter(function (_ref7) {
      var value = _ref7.value,
          name = _ref7.name;
      return value === importance;
    })[0].name;
  };

  return React.createElement(
    'li',
    { className: 'todo__item row-aligner' },
    React.createElement('input', {
      type: 'checkbox',
      className: 'todo__item--checkbox',
      onChange: function onChange() {
        return onChangeComplete(todo.id);
      }
    }),
    React.createElement(
      'div',
      { className: 'todo__item--info' },
      React.createElement(
        'span',
        null,
        '\uC911\uC694\uB3C4 : ',
        getImportance(todo.importance)
      ),
      React.createElement(
        'span',
        null,
        '\uCD94\uAC00\uC77C : ',
        todo.date
      ),
      React.createElement(
        'p',
        { className: todo.complete ? 'complete' : '' },
        todo.text
      )
    ),
    React.createElement('button', { type: 'button', className: 'todo__item--sorting-button' })
  );
};

var App = function App() {
  var _React$useState5 = React.useState(dummyDatas),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      todos = _React$useState6[0],
      setTodos = _React$useState6[1];

  var _React$useState7 = React.useState(['whole']),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      importances = _React$useState8[0],
      setImportances = _React$useState8[1];

  var _React$useState9 = React.useState(['whole']),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      completes = _React$useState10[0],
      setCompletes = _React$useState10[1];

  var handleAddTask = function handleAddTask(importance, text) {
    var newItem = {
      importance: importance,
      text: text,
      id: todos.length,
      date: moment().format('YYYY.MM.DD'),
      complete: false
    };
    var newTodos = [].concat(_toConsumableArray(todos));
    newTodos.push(newItem);
    setTodos(newTodos);
  };

  var handleSelectImportant = function handleSelectImportant(value) {
    if (value === 'whole') {
      setImportances(['whole']);
    } else {
      var newImportance = [].concat(_toConsumableArray(importances)).filter(function (e) {
        return e !== 'whole';
      });
      if (newImportance.includes(value)) {
        var arr = newImportance.filter(function (e) {
          return e !== value;
        });
        setImportances(arr.length === 0 ? ['whole'] : arr);
      } else {
        newImportance.push(value);
        setImportances(newImportance);
      }
    }
  };

  var handleSelectComplete = function handleSelectComplete(value) {
    if (value === 'whole') {
      setCompletes(['whole']);
    } else {
      var newCompletes = [].concat(_toConsumableArray(completes)).filter(function (e) {
        return e !== 'whole';
      });
      if (newCompletes.includes(value)) {
        var arr = newCompletes.filter(function (e) {
          return e !== value;
        });
        setCompletes(arr.length === 0 ? ['whole'] : arr);
      } else {
        newCompletes.push(value);
        setCompletes(newCompletes);
      }
    }
  };

  var handleChangeComplete = function handleChangeComplete(itemId) {
    var newTodos = [].concat(_toConsumableArray(todos)).map(function (e) {
      return Object.assign({}, e, {
        complete: e.id === itemId ? !e.complete : e.complete
      });
    });
    setTodos(newTodos);
  };

  var getTodoLIst = function getTodoLIst() {
    var newImportantTodos = importances.includes('whole') ? todos : [].concat(_toConsumableArray(todos)).filter(function (_ref8) {
      var importance = _ref8.importance;
      return importances.includes(importance);
    });
    if (completes.includes('whole') || completes.length === 2) {
      return newImportantTodos;
    }
    return [].concat(_toConsumableArray(newImportantTodos)).filter(function (e) {
      return completes.includes('complete') ? e.complete : !e.complete;
    });
  };

  return React.createElement(
    'div',
    { className: 'todo__wrapper' },
    React.createElement(Input, { onAddTask: handleAddTask }),
    React.createElement(
      'div',
      { className: 'todo__filter--wrapper' },
      React.createElement(Filter, {
        selected: importances,
        options: wholeOptions.concat.apply(wholeOptions, importanceOptions),
        onSelectOption: handleSelectImportant
      }),
      React.createElement(Filter, {
        selected: completes,
        options: wholeOptions.concat.apply(wholeOptions, completeOptions),
        onSelectOption: handleSelectComplete
      })
    ),
    React.createElement(ToDoList, { todos: getTodoLIst(), onChangeComplete: handleChangeComplete })
  );
};

var domContainer = document.getElementById('root');
ReactDOM.render(e(App), domContainer);