import fetchError from './generalAction.js'

export default function deleteData(url, id, actionCreator, allData) {
    return (dispatch, getState) => {
        return fetch(url + '/' + id, {
            method: 'delete',
            headers: { token: localStorage.getItem('token') }
        })
            .then((resp) => {
                if (!resp.ok) {
                    return resp.text()
                        .then(text => { throw new Error(text) })
                }
                const newData = allData.filter(e => e.id !== id)
                dispatch(actionCreator(newData))
            })
            // .catch((err) => {
            //     fetchError(JSON.parse(err.message).message)
            // });
    }
}