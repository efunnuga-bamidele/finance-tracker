import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)


            dispatch({type: 'LOGIN', payload: res.user})
            //Temporary to bypass cleanup function
            // setIsPending(false)

            //update State
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }catch(err){
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
        
    }

    useEffect(() => {
        console.log("UseEffect fired")
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }
}