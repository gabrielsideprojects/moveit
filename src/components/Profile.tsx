import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'
export function Profile(){
    const { level} = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/gabrielsideprojects.png" alt="Gabriel Menezes"/>
            <div>
                <strong>Gabriel Menezes</strong>
                <img src="icons/level.svg" alt="Level"/>
                <p>Level {level}</p>
            </div>
        </div>
    )
}