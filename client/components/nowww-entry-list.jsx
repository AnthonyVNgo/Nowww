// import React from 'react';

// function NowwwEntryList(props) {
//   if (props.nowEntries === undefined) {
//     // console.log('bang')
//   }

// return (
// console.log('hi')
// console.log(`props.nowEntries:`, props.nowEntries)
// <ul className="list-group now-ul">
//   {
//     props.nowEntries.map((nowEntry, index) => {
//       return (
//         // <NowEntryLI key={index} nowEntry={nowEntry} route={this.content.route}/>
//         <NowEntryLI key={index} nowEntry={nowEntry} route={props.route} handleClick={props.handleClick}/>
//       );
//     })
//   }
// </ul>
// );
// }

// function NowEntryLI(props) {
//   const entryId = props.nowEntry.EntryId;
//   const { content } = props.nowEntry;
//   let display;

//   if (props.route.path === 'edit') {
//     display = 'delete-btn';
//   }

//   if (props.route.path !== 'edit') {
//     display = 'display-none';
//   }

//   return (
//     <li className="list-group-item">
//       <span>{content}</span>
//       <span className='position-absolute top-0 right-0'>
//         <button
//         className={display}
//         onClick={() => props.handleClick(entryId)}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
//             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
//           </svg>
//         </button>
//       </span>
//     </li>
//   );
// }

// export default NowwwEntryList;