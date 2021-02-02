import React, { useState } from 'react';

// import { Container } from './styles';
import { addCustomer } from './reducer/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CustomerForm() {

    const [formData, setFormData] = useState();

    const dispatch = useDispatch();

    const customers = useSelector(state => state.customer)
    const handleSubmit = (e) => {

        e.preventDefault();
        dispatch(addCustomer(formData));

    }
    
    return (
        <React.Fragment>
            <h3>ADD Customer</h3>
            <form onSubmit={handleSubmit} >
                <input type={'text'} name={'name'} onChange={e => setFormData({ [e.target.name]: e.target.value })} />
                <button type={'submit'}>ADD</button>
            </form>
            <h3>Customer List</h3>
            <ul>
                {customers.map((customer, id) => <li key={id}>{customer.name}</li>)}
            </ul>
        </React.Fragment>
    );
}

