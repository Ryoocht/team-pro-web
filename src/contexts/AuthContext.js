import React, { useContext, useEffect, useState } from 'react';
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [ currentUser, setCurrentUser ] = useState();

    const signup = async(username, email, password) => {
        return await auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user;
            if (user) {
                const uid = user.uid;
                const userInitialData = {
                    email: email,
                    uid: uid,
                    username: username
                }
                firestore.collection("users").doc(uid).set(userInitialData)
                .then(() => console.log("Document successfully written!"))
                .catch(error => console.log("Error writing document: ", error));
            }
        });
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const signout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const value = {
        currentUser,
        signup,
        login,
        signout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
