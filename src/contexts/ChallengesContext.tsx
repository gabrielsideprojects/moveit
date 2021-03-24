import {createContext, useState, ReactNode} from 'react'
import challenges from '../../challenges.json'

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
    resetChallenge: ()=>void;
    experienceToNextLevel:number;
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChanllengesCompleted] = useState(0)
    const [activeChallenge , setActiveChallenge]= useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        const randomChallengedIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengedIndex]
        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
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
        resetChallenge
        }}>
        {children}
    </ChallengesContext.Provider>
  )
}