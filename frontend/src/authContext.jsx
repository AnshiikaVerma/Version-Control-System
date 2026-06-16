import React ,{createContext,useState,useEffect,useContext, children} from 'react';

const AuthContext=createContext();  

export const useAuth=()=>{ //custom hook
return useContext(AuthContext); 
}

export const AuthProvider=({Children})=>{
    const [currentUser,setCurrentUser]=useState(null) ;//currentuser ->id  of user
    useEffect(()=>{
        const userId=localStorage.getItem('userId')
        if(userId){
            setCurrentUser(userId);
        }
    },[]);

    const value={
        currentUser,setCurrentUser
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
