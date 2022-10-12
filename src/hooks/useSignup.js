import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"

import { useAuthContext } from "./useAuthContext"

/*
sign up hook for create new user in firebase auth
*/

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
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
        dispatch({type: 'SIGNUP', payload: res.user})
        //Temporary to bypass cleanup function
        setIsPending(false)

        //update state
           if(!isCancelled){
                setIsPending(false)
                setError(null)
           }

        }catch (err){
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
                }
        }
    }

    useEffect(() => {
       
        const unsub = () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }

}