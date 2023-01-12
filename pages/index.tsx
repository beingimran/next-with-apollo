// import {signIn, signOut, useSession} from 'next-auth/react'

import Register from "./register";


// export default function MyApp(){
//   const {data:session} = useSession()
//   if(session){
//     return(<button onClick={()=>signOut()}>Signout</button>)
//   }
//   else {
//     return(<button onClick={()=>signIn()}>SignIn</button>)

//   }
// }

export default function  MyApp(){
  return(
    <Register></Register>
  )
}