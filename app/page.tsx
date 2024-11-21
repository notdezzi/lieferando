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
        height: "90vh",
        marginTop: "80px",
        /*backgroundImage: "url(${bgimg})", -----  Check later
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "norepeat",*/
      }}
    >
      
      <div className="wrapper-content">
        <Image
        alt="Logo"
        src={drinkanddrivealpha}
        style= {{
          marginBottom: "1rem",
        }}

        />
        <div className="wrapper-search-pg" 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <input type="text" className="searchbar" placeholder="Suche hier nach deiner Postleitzahl..."></input>
          <button className="searchbutton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
        </div>
      </div>

    </main>
  );
}