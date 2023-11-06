import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginLogout() {
    const [accountIdentifier, setAccountIdentifier] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const accountIdentifier = sessionStorage.getItem('accountIdentifier');
        if (accountIdentifier) {
            setLoggedIn(true);
            setAccountIdentifier(accountIdentifier);
        }
    }, []);

    const getSessionId = async () => {
        if (!window.Verisoul) {
            console.log('Verisoul not found. Please make sure you have included the Verisoul script in your index.html file.');
            return;
        }

        try {
            const {session_id} = await window.Verisoul.session();
            console.log('Session ID: ', session_id);
            return session_id;
        } catch (error) {
            console.log('Error getting session ID: ', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);

        if (!accountIdentifier) {
            setDisabled(false);
            return;
        }

        const sessionId = await getSessionId();

        if (!sessionId) {
            setDisabled(false);
            return;
        }
        try {
            const response = await fetch('/api/authenticated', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    account_id: accountIdentifier
                })
            });

            /*
             Note: The api response is shown on the front end for demonstration purposes only.
             The decision logic must be implemented on the backend and api response should not be exposed to the front end.
             */
            const results = await response.json();

            sessionStorage.setItem('accountIdentifier', accountIdentifier);
            navigate('/results', {state: {results}});

        } catch (error) {
            console.log('Error: ', error);
            setDisabled(false);
        }

    };

    const handleLogout = async (event) => {
        event.preventDefault();
        if (!window.Verisoul) {
            console.log('Verisoul not found. Please make sure you have included the Verisoul script in your index.html file.');
            return;
        }

        try {
            await window.Verisoul.reinitialize();
        } catch (error) {
            console.log('Error logging out: ', error);
        }
        sessionStorage.removeItem('accountIdentifier');
        setLoggedIn(false);
        setAccountIdentifier('');
        setDisabled(false)
    }

    if (loggedIn) {
        return (
            <div>
                <h1>Logout</h1>
                <form className="form" onSubmit={handleLogout}>
                    <label className="form__label" htmlFor="text-input">Logged in Account</label>
                    <input className="form__input" type="text" id="text-input" name="text"
                           value={accountIdentifier}
                           onChange={(e) => setAccountIdentifier(e.target.value)} disabled={true}></input>
                    <button className="form__button" id="submit-button" type="submit">Logout</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h1>Login or Signup</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label className="form__label" htmlFor="text-input">New Account</label>
                <input className="form__input" type="text" id="text-input" name="text"
                       placeholder={"Enter account identifier"} value={accountIdentifier}
                       onChange={(e) => setAccountIdentifier(e.target.value)} disabled={disabled}></input>
                <button className="form__button" id="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginLogout;
