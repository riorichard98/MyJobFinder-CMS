import fetchError from './generalAction.js'

export default function fetchAlldata(url, actionCreator) {
  return (dispatch, getState) => {
    return fetch(url, { headers: { token: localStorage.getItem('token') } })
      .then((resp) => {
        if (!resp.ok) {
          return resp.text()
            .then(text => { throw new Error(text) })
        }
        return resp.json();
      })
      .then((resp) => {
        dispatch(actionCreator(resp))
      })
    // .catch((err) => {
    //   dispatch(fetchError(JSON.parse(err.message).message))
    // });
  };
}

// export default function deleteData(url, id, actionCreator, allData) {
//   return (dispatch, getState) => {
//     fetch(url + '/' + id, {
//       method: 'delete'
//     })
//       .then((resp) => {
//         if (!resp.ok) {
//           throw new Error("Error");
//         }
//         const newData = allData.filter(e => e.id !== id)
//         dispatch(actionCreator(newData))
//       })
//       .catch((err) => {
//         fetchError(err.response.data)
//       });
//   }
// }

// export default function addData(url, data, actionCreator, allData) {
//   return (dispatch, getState) => {
//     fetch(url, {
//       method: 'post',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(resp => {
//         if (!resp.ok) {
//           throw new Error("Error");
//         }
//         return resp.json()
//       })
//       .then(resp => {
//         const newData = allData.push(data)
//         dispatch(actionCreator(newData))
//       })
//       .catch((err) => {
//         fetchError(err.response.data)
//       });
//   }
// }

// export default function updateData(url, data, actionCreator, allData, id) {
//   return (dispatch, getState) => {
//     fetch(url + '/' + id, {
//       method: 'put',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(resp => {
//         for(let i = 0 ; i < allData.length ; i++){
//           if(allData[i].id === id){
//             allData[i] = data
//           }
//         }
//         dispatch(actionCreator(allData))
//       })
//       .catch((err) => {
//         fetchError(err.response.data)
//       });
//   }
// }