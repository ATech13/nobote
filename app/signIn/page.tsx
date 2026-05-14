"use client"
import React from 'react'
import Wrapper from '../components/Wrapper'
import styles from "@/app/style"
import Image from 'next/image'
import logo from "../assets/logo.jpg";
import { LogIn } from 'lucide-react';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FcGoogle } from 'react-icons/fc'

const Loggin = () => {

  const router = useRouter()
  const { data: session } = useSession()

  async function handleGoogleSignIn() {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    })
    if(result?.ok) {
      router.push("/")
    }
  }

  return (
    <Wrapper>
      <div className={`${styles.flexCenter} w-full px-6 min-h-screen`}>
        <div className={`w-full max-w-120 ${styles.flexCenter} flex-col p-6 rounded-lg gap-4 bg-base-300 border_animate`}>
          <div className={`${styles.flexBetween} w-full gap-2`}>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image src={logo} alt="logo de noboté" />
              </div>
              <span className="uppercase font-bold text-xl md:text-2xl text-secondary">noboté</span>
            </div>
            <h1 className="font-bold text-[20px] md:text-3xl"> Se connecter</h1>
          </div>

          <div className={`w-full ${styles.flexCenter} flex-col gap-3`}>
            <input type="text" className="input input-sm input-bordered w-full rounded-lg"
              placeholder="Entrez votre nom d'utilisateur"
            />
            <input type="password" className="input input-sm input-bordered w-full rounded-lg"
              placeholder="Entrez votre mot de passe"
            />
            <button onClick={handleGoogleSignIn} className="btn btn-sm bg-base-100 text-secondary btn-ghost w-full rounded-lg flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Se connecter avec Google <span><FcGoogle className="w-4 h-4" /></span>
            </button>
            <input type="submit" value="Envoyer" className="btn btn-sm bg-secondary text-base-100 w-full rounded-lg" />
          </div>
        </div>
      </div>

    </Wrapper>
  )
}

export default Loggin
// require username: string
// require password: string($password)
// scope: string
// client_id: string | (string | null)
// client_secret: string | (string | null)($password)