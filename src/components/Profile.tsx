import styles from '../styles/components/Profile.module.css'
export function Profile(){
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/gabrielsideprojects.png" alt="Gabriel Menezes"/>
            <div>
                <strong>Gabriel Menezes</strong>
                <img src="icons/level.svg" alt="Level"/>
                <p>Level 1</p>
            </div>
        </div>
    )
}