import { useState } from "react";
import styles from '../styles/components/Login.module.css'
import {Requests} from '../Utils/Requests'

export function Login() {
    const [username, setUsername] = useState('')
    const [loginIsLoading, setLoginIsLoading] = useState(false)
 
    const handleSubmitGithubUsername = () => {
        setLoginIsLoading(true)
            Requests.github.getUserData(username).then(response =>{        
                setLoginIsLoading(false)
        
            })
    }
    return (
        <div className={styles.container}>

            <div className={styles.loginFormContainer}>
                <img className={styles.moveItNowLogo} src="moveitWhiteLogo.svg" alt="Horizontal"/>
                <p className={styles.welcomeText}>Bem-vindo</p>
                <div className={styles.doGitHubLoginContainer}>
                    <img src="githubMiniLogo.svg" alt="Horizontal"/>
                    <p className={styles.doGitHubLoginText}>Faça login com seu Github <br/>para começar</p>
                </div>
                <div className={styles.usernameInputSubmitContainer}>
                    <input 
                        placeholder={'Digite seu username'} 
                        className={styles.usernameInput} 
                        type="text" 
                        value={username} 
                        onChange={event => setUsername(event.target.value)} 
                    />
                    <button onClick={handleSubmitGithubUsername} className={styles.submitUsernameButton}>
                        <div className={styles.arrowRightContainer}>
                            {
                                loginIsLoading ?  <div className={styles.loader}/> :  
                                  <img src="arrowRight.svg" alt="Horizontal"/>
                            }
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}