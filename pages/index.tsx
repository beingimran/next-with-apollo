import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./login";
import Content from "./post";
import { useRouter } from "next/router";


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
  const router = useRouter();
  const [token,setToken] = useState(false)
  let tokens: string | null
  if (typeof window !== 'undefined') {
    // Perform localStorage action
  tokens = localStorage.getItem('token')
    
  }
  useEffect(()=>{
    if (tokens){
      setToken(true)
    }

  },[])

  return(
    <>
      {token ? router.push("/post") : <Login></Login>}
      </>
  );
}