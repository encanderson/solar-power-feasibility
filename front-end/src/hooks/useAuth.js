import { useContext } from "react";

// auth provider
// import FirebaseContext from '../contexts/FirebaseContext';
// import Auth0Context from '../contexts/Auth0Context';
import JWTContext from "@src/contexts/JWTContext";

//-----------------------|| AUTH HOOKS ||-----------------------//

const useAuth = () => useContext(JWTContext);

export default useAuth;
