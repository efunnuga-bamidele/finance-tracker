import { useState } from "react"
import { projectAuth } from "../firebase/config"

import { useAuthContext } from "./useAuthContext"

/*
sign up hook for create new user in firebase auth
*/

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()


    //create a async call 
    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
           const res =  await projectAuth.createUserWithEmailAndPassword(email, password)
           

           if(!res){
            throw new Error('Could not complete signup')
           }

           //add display name to user
        //    await res.user.updateProfile({ displayName: displayName})
        await res.user.updateProfile({ displayName})

        //dispatch login action
        dispatch({type: 'LOGIN', payload: res.user})

        setIsPending(false)
        setError(null)

        }catch (err){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signup }

}