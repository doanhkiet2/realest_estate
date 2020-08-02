import React, { useState, useEffect } from 'react'
import { setAlert } from '../actions/alerts'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';
import axios from 'axios'

const Contact = ({ setAlert }) => {
    const [fromData, setFromData] = useState({})
    const [loading, setLoading] = useState(false)

    const { email, name, subject, message } = fromData

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onChange = e => {
        setFromData({ ...fromData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setLoading(true)
        axios.post("http://192.168.1.169:8000/api/contacts/", { email, name, subject, message }, config)
            .then(res => {
                setAlert('MassageSend', 'success')
                setLoading(false)
                window.scrollTo(0, 0)
            }).catch(err => {
                setAlert('Error with Sending Message', 'error');
                setLoading(false);
                window.scrollTo(0, 0);
            })
    }


    return (
        <div className='contact'>
            contact
            <h1 className="contact__header">Contact with  us</h1>
            <form onSubmit={e => onSubmit(e)} className="contact__form">
                <label htmlFor="name" className="contact__form__label">name</label>
                <input name="name"
                    value={name}
                    type="text"
                    onChange={e => onChange(e)}
                    className="contact__form__input"
                    placeholder='name'
                />
                <label htmlFor="email" className="contact__form__label">email</label>
                <input
                    name="email" value={email}
                    type="email"
                    onChange={e => onChange(e)}
                    className="contact__form__input"
                    placeholder='email'
                />
                <label htmlFor="subject" className="contact__form__label">subject</label>
                <input
                    name="subject" value={subject}
                    type="text"
                    onChange={e => onChange(e)}
                    className="contact__form__input"
                    placeholder='subject'
                />
                <label htmlFor="message" className="contact__form__label">message</label>
                <textarea
                    className='contact__form__area'
                    name="message"
                    value={message}
                    cols="30"
                    rows="10"
                    onChange={e => onChange(e)}
                    placeholder='Message'
                >
                </textarea>
                {loading
                    ? <div className="contact__form__Loader">
                        <Loader
                            type="Oval"
                            color="#424242"
                            height="50"
                            width="50"
                        />
                    </div>
                    : <button className="contact__form__button" htmltype="submmit">send</button>
                }
            </form>
        </div>
    )
}

export default connect(null, { setAlert })(Contact)