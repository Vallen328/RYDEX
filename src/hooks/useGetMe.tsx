'use client'
import { setUserData } from '@/redux/userSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
//For fetching the API, we use AXIOS
function useGetMe(enabled : boolean) {
    const dispatch = useDispatch()
    useEffect(() => {
        if(!enabled){
            return
        }
        const getMe = async() => {
            try{
                const { data } = await axios.get("/api/user/me")
                dispatch(setUserData(data))  //Yeh data humari payload hai, jisme user ka data aayega, aur yeh setUserData humari reducer function hai, jisme hum userData ko update karenge. So finally we will get the user data in our store.
            }catch(error){
                console.log(error)
            }
            
        }
        getMe()
    }, [enabled])
}

export default useGetMe