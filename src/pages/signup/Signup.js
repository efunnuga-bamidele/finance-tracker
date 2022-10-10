import { useState } from 'react'
import { projectFirestore } from '../../firebase/config'
//Style
import styles from './Signup.module.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

    }
    return(
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2>Signup</h2>
            <label>
                <span>Email:</span>
                <input 
                    type='email'
                    placeholder='Enter your email address'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type='password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    type='text'
                    placeholder='Enter display name'
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <button className='btn'>Sign up</button>
        </form>
    )
}