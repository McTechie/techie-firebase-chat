import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../firebase";
import firebase from "firebase/app";

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Techie Chat!</h2>
                <p>Created using <strong>Firebase</strong> and <strong>Chat Engine</strong></p>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                    <GoogleOutlined /> Sign In with Google
                </div>
                <br /><br />
                <div
                    className="login-button github"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())}
                >
                    <GithubOutlined /> Sign In with GitHub
                </div>
                <br /><br />
                <p>A <strong>McTechie</strong> creation ✨</p>
            </div>
        </div>
    );
}
 
export default Login;