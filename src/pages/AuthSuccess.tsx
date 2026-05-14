import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../Authenticator/AuthContext";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token && auth) {
      // ✅ FIX: Pass an empty object for user, and the token as the second argument
      // This tells the App: "Someone is logged in with this token, now go fetch their name!"
      auth.login({}, token).then(() => {
        // Redirect to profile so they can see their name appear after the sync
        navigate("/profile");
      });
    } else {
      navigate("/signin");
    }
  }, [searchParams, auth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-Mg border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-Dg font-semibold">Finalizing Login...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;