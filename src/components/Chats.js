import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    
    const { user } = useContext(AuthContext);
    console.log(user.displayName);
    console.log(user.uid);

    const handleLogout = async () => {
        await auth.signOut();
        history.push("/");
    }

    const getFile = async (url) => {
        const res = await fetch(url);
        const data = await res.blob();
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    }

    useEffect(() => {
        if (!user || user === null) {
            history.push("/");
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
                "user-name": user.displayName,
                "user-secret": user.uid,
            }
        })
        .then(() => setLoading(false))
        .catch((err) => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.displayName);
            formData.append('secret', user.uid);
            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name);
                    axios.post(
                        'https://api.chatengine.io/users/',
                        formData,
                        { headers: { "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                    )
                    .then(() => setLoading(false))
                    .catch((err) => console.log(err.response));
                })
        })
    }, [user, history]);

    if (!user || loading) return "Loading..."
    
    return (
        <div className="chats-page">
            <div className="navbar">
                <div className="navbar-brand">
                    Techie Chat
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    <strong>Logout</strong>
                </div>
            </div>
            <ChatEngine
                height="91.8vh"
                projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.displayName}
                userSecret={user.uid}
            />
        </div>
    );
}
 
export default Chats;