'use strict';

const e = React.createElement;

const APP = () => {
  console.log(React);
  return <button onClick={() => console.log('adasd')}>Like</button>;
};

const domContainer = document.getElementById('root');
ReactDOM.render(e(APP), domContainer);
