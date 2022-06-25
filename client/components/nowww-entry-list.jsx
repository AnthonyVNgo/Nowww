import React from 'react';

function NowEntryLI(props) {
  const { content } = props.nowEntry;
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
            <NowEntryLI key={index} nowEntry={nowEntry} />
          );
        })
      }
    </ul>
  );
}

export default NowwwEntryList;
