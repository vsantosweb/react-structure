

export const addCustomer = (customer) => ({
    type: 'ADD_CUSTOMER',
    payload: customer
});

export const customerList = (data) =>({
    type:'CUSTOMER_LIST',
    payload: data
});
// export const startSession = () => {

//     return async dispatch => {

//         await Axios.post(process.env.REACT_APP_API_URL + '/client/disc/session/start').then(response => {
//             console.log(response.data)
//             dispatch({
//                 type: 'CUSTOMER_SAMPLE',
//                 payload: response.data.data
//             })
//         })
//     }
// }