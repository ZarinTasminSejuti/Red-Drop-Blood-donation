
import { createContext, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';
import { useState } from "react";
import app from "../firebase/firebase.config";





const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();





const AuthProvider = ({ children }) => {
    const [nameAndPhoto, setNameAndPhoto] = useState({});

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
   }

    //login authentication
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //google login authentication
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //Update Name after register
    //As per firebase doc user logged in when register complete
    //So updateProfile method need to use to update displayName
    // updateProfile(auth.currentUser, nameAndPhoto)
        
    //     .then()
    //     .catch((error) => {
    //         console.error(error);
    //       });

    useEffect(() => {
        if (user) {
          updateProfile(auth.currentUser, nameAndPhoto)
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
        }
      }, [user, nameAndPhoto]);
    
    
    //log out authentication
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const userDetails = auth.currentUser;
   

        useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, currentUser => {
                // console.log("done", currentUser);
                setUser(currentUser);
                setLoading(false);
            });
            return () => {
                unSubscribe();
            }
        }, [])

    const authInfo = {signIn, signInGoogle, signUp, setNameAndPhoto, loading, user, logOut, userDetails}

    return (
        <div>
             <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;


AuthProvider.propTypes = {
    children: PropTypes.node
}