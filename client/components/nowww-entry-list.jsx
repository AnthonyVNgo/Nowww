import React from 'react';

function Todo(props) {
  const { content } = props.todo;
  return (
    <li className="list-group-item">
        <p>{content}</p>
    </li>
  );
}

function NowwwEntryList(props) {
  return (
    <ul className="list-group now-ul">
      {
        props.nowEntries.map((nowEntry, index) => {
          return (
            <Todo key={index} todo={nowEntry} />
          );
        })
    }
    </ul>
  );
}

export default NowwwEntryList;
