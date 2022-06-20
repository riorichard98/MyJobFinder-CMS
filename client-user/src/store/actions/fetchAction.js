import { fetchJob } from "./jobAction";

export default function fetchAlldata() {
  return (dispatch, getState) => {
    return fetch('https://p3-c1-h8.herokuapp.com/jobs', { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4NzE4NzkwfQ.2e5HL1W7d6t8U3MS6bzHQeLXeVgMVkHrcCI7P_nCLsE' } })
      .then((resp) => {
        if (!resp.ok) {
          return resp.text()
            .then(text => { throw new Error(text) })
        }
        return resp.json();
      })
      .then((resp) => {
        dispatch(fetchJob(resp))
      })
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