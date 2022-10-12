import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        //realtime listener
        let ref = projectFirestore.collection(collection)

        //sends a response snapshot when the forebase data changes
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id})
            })

            //update state
            setDocument(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        //unsubscribe or unmount

        return () => unsubscribe()

    }, [collection])

    return { document, error }
}