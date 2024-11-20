import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import drinkanddrive from '../public/drinkanddrive.png';

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
      }}
    >
      <div className="wrapper-content">
        <Image
        alt="Logo"
        src={drinkanddrive}
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
          <input type="text" className="searchbar" placeholder="Suche hier nach deiner Adresse..."></input>
          <button className="searchbutton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
        </div>
      </div>

    </main>
  );
}