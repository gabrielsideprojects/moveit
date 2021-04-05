import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge:Challenge;
    levelUp: ()=> void;
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
    closeLevelUpModal: ()=> void;
    experienceToNextLevel:number;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
      
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChanllengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge , setActiveChallenge]= useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge(){
        const randomChallengedIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengedIndex]
        setActiveChallenge(challenge)
        new Audio('/notification.mp3').play()
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`,
                
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel) {
            finalExperience =  finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChanllengesCompleted(challengesCompleted + 1)
    }
  return (
    <ChallengesContext.Provider value={{
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
        }}>
        {children}
       {isLevelUpModalOpen && <LevelUpModal/> } 
    </ChallengesContext.Provider>
  )
}