import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    //if we don't use a ref --> infinite loop in useEffect
    //_query is an array and is  "different" on every function call
    const query = useRef(_query).current 
    const orderBy = useRef(_orderBy).current 


    useEffect(() => {
        //realtime listener
        let ref = projectFirestore.collection(collection)

        //check query
        if (query){
            ref = ref.where( ...query)
        }
        if (orderBy){
           ref = ref.orderBy( ...orderBy) 
        }

        //sends a response snapshot when the forebase data changes
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        //unsubscribe or unmount

        return () => unsubscribe()

    }, [collection, query, orderBy])

    return { documents, error }
}