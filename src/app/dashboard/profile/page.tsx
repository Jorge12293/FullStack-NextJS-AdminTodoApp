'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function ProfilePage(){
    const session = useSession()
    useEffect(()=>{
        console.log('Client Side')
    },[])
    return(
        <div>
            <h1>Page Profile</h1>
            <hr />
            <div className="flex flex-col">
                <span>{session.data?.user?.name ?? 'No name'}</span>
                <span>{session.data?.user?.email ?? 'No email'}</span>
            </div>
        </div>
    )
}