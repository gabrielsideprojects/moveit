import { ChallengeBox } from '../../components/ChallengeBox';
import { CompletedChallenges } from '../../components/CompletedChallenges';
import { Countdown } from '../../components/Countdown';
import { ExperienceBar } from "../../components/ExperienceBar";
import { Profile } from '../../components/Profile';
import { CountdownProvider } from '../../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import Head from 'next/head'

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
  }
  
export function Dashboard(props: HomeProps){
       <ChallengesProvider 
        level={props.level} 
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
}