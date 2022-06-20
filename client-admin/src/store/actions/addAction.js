

export default function addData(url, data, actionCreator, allData, pushData) {
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'post',
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
        newData.unshift(resp)
        // newData.unshift(pushData)
        dispatch(actionCreator(newData))
        return 'ok'
      })
    // .catch((err) => {
    //   // fetchError(err.response.data)
    //   // console.log(JSON.parse(err.message).message);
    //   dispatch(fetchError(JSON.parse(err.message).message))
    // });
  }
}