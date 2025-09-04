"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container flex items-center justify-between flex-col mx-auto md:flex-row">
        <Link href={"#"}>Mystry Message</Link>
        {session ? (
          <>
            <span className="mr-4">{user?.username || user?.email}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button className="w-full md:w-auto">Login</Button>
            </Link>
            {/* <Link href="/sign-up">Sign Up</Link> */}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
