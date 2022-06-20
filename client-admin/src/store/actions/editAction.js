import { url } from "../../url"

export default function editJob(data, actionCreator, allData, id) {
  return (dispatch, getState) => {
    return fetch(url + `/jobs/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      }
    })
      .then(resp => {
        if (!resp.ok) {
          return resp.text()
            .then(text => { throw new Error(text) })
        }
        return resp.json()
      })
      .then(resp => {
        // console.log(resp);
        let newData = allData
        for (let i = 0; i < newData.length; i++) {
          if(newData[i].id === resp.id ){
            newData[i] = resp
          }
        }
        // newData.unshift(pushData)
        dispatch(actionCreator(newData))
        return 'ok'
      })
  }
}