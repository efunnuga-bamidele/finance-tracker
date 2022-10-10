import { useState } from "react"
import { projectAuth } from "../firebase/config"

/*
sign up hook for create new user in firebase auth
*/

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)


    //create a async call 
    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
           const res =  await projectAuth.createUserWithEmailAndPassword(email, password)
           console.log(res.user)

           if(!res){
            throw new Error('Could not complete signup')
           }

           //add display name to user
        //    await res.user.updateProfile({ displayName: displayName})
        await res.user.updateProfile({ displayName})

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