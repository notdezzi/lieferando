"use client";

import drinkanddrivesmallw from '../public/drink_and_drive_small_white.png';
import Image from "next/image";
import styles from './header.component.module.css' //Checken ob components eigene css haben können und dann umlagern
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav>
      <Link href={"/"}>
        <Image
          alt="Logo"
          src={drinkanddrivesmallw}
          style={{
            maxWidth: '200px',
            height: 'auto',
          }}
        />
      </Link>
      <div className={styles.wrappersearchpg}>
        <Input type="text" className={styles.searchbar} placeholder="Suche hier nach deiner Postleitzahl..."></Input>
        <Button variant="outline" size="icon" className={styles.searchbutton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></Button>
      </div>

      <div className={styles.wrappercartprofile}>
        <a href="/order" className="cart" ><ShoppingCart /></a>
        <DropdownMenu>
          <DropdownMenuTrigger><User /></DropdownMenuTrigger>
          {session ? (
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/settings"} prefetch={true}>Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={"/settings/orders"} prefetch={true}>Orders</Link></DropdownMenuItem>
              <DropdownMenuItem><Button variant="destructive" onClick={() => signOut()}>Log Out</Button></DropdownMenuItem>
              </DropdownMenuContent>
          ) : (
            <DropdownMenuContent>
              <DropdownMenuLabel>Not Logged in</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/login"} prefetch={true}>Login</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={"/register"} prefetch={true}>Register</Link></DropdownMenuItem>
            </DropdownMenuContent>
          )
          }
        </DropdownMenu>
      </div>
    </nav>
  )
}