import React, { useState, useEffect } from 'react';
import Validator from 'Validator';
import Authenticator from '../../../start/authenticator';

export default function Login({layout, pageConfig}) {

    const [formData, setFormData] = useState(false);
    const [formFeedBack, setFormFeedBack] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);
    
    useEffect(() => {
        
        layout('AuthLayout')
        
        pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
            pageTitle: 'Login', 
            pageUrl: '/login', 
            image: null
        })

    }, [layout, pageConfig])
    
    const rules = (data) => (

        Validator.make(data, {
            email: 'required',
            password: 'required'
        })
    )

    const handleInput = (e) => {
        let json = Object.assign({}, formData);
        json[e.target.name] = e.target.value;

        setFormData(json);
        const validator = rules(json);

        if (validator.fails()) {
            console.log(validator.getErrors()[e.target.name])
            setFormFeedBack({[e.target.name]: validator.getErrors()[e.target.name]});
            setDisableSubmit(true);

            return;
        }
        setFormFeedBack(false)
        setDisableSubmit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validator = rules(formData);

        if (validator.fails()) {
            console.log(validator.getErrors())
            setFormFeedBack(validator.getErrors());
            setDisableSubmit(true);
            return;
        }
        console.log('ok')
        Authenticator.signIn(formData).then(response => {
            console.log(response)
            if(response.data.error){
                setFormFeedBack({customFeedback: response.data.message})
            }
        })
        e.target.reset();
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input name={'email'} type={'text'} onChange={handleInput} defaultValue={FormData.email} />
                {formFeedBack ? formFeedBack.email: ''}

                <label>Senha</label>
                <input name={'password'} type={'password'} onChange={handleInput} defaultValue={FormData.email} />
                <button disabled={disableSubmit} type={'submit'}>Entrar</button>
                {formFeedBack ? formFeedBack.password: ''}
            </form>
            {formFeedBack ? formFeedBack.customFeedback: ''}
        </React.Fragment>
    )
}