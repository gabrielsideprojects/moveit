
import {GetServerSideProps} from 'next'

import {Login} from './Login'


export default function Home() {
  
  return (
    <Login/>
  )
}

/**
 * 
 * Função que é usada para retornar dados antes mesmo do front ser renderizado.
 */
export const getServerSideProps : GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
 
