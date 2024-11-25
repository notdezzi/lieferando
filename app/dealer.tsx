import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
  } from "@/components/buttons.component";
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/lib/auth";
  import Image from "next/image";
  import drinkanddrivealpha from '../public/drinkanddrivealpha.png';
  import bgimg from '../public/bgimg.png';

  export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log(session);
  
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "80vh",
          /*backgroundImage: "url(${bgimg})", -----  Check later
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "norepeat",*/
        }}
      >
        
    
      </main>
    );
  }