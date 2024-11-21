"use client";

import drinkanddrivesmallw from '../public/drink_and_drive_small_white.png';
import Image from "next/image";
import styles from '../app/page.module.css' //Checken ob components eigene css haben können und dann umlagern


export default function Header(){
    return (
        <nav>
            <Image
            alt="Logo"
            src={drinkanddrivesmallw}
            style={{
              maxWidth: '200px',
              height: 'auto',
            }}
            />
            <div className={styles.wrappersearchpg}>
              <input type="text" className={styles.searchbar} placeholder="Suche hier nach deiner Postleitzahl..."></input>
              <button className={styles.searchbutton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
            </div>
            <button className="profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>
        </nav>
    )
}