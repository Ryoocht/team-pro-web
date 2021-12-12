import React, { useEffect, useState, useRef } from 'react';
import "../style/Home.css";
import { firestore } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import UserIcon from "../image/user-solid.svg";
import { Button } from "react-bootstrap"; 

const ChatRoom = () => {
    const { currentUser } = useAuth();
    const [ userNames, setUserNames ] = useState([]);
    const messageRef = useRef("");
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    let msgTo = userList => {
        return `Hey ${userList}!`;
    }
    const defMsg = "I am sending you a message :)\n\nBye!"

    useEffect(() => {
        setUserNames([""]);
        firestore.collection("users").get()
        .then(users => {
            if (users) {
                users.forEach(user => {
                    const userData = user.data();
                    setUserNames(prevState => [
                        ...prevState,
                        {
                        username: userData.username,
                        uid: userData.uid
                    }]);
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },[]);

    const handleClick = e => {
        const selectedBox = document.getElementById(e.target.id);
        const firstName = e.target.id.split(" ")[0];

        if (selectedBox.className === "") {
            setSelectedUsers([...selectedUsers, firstName]);
            selectedBox.className = "selected";
        } else {
            console.log(firstName);
            const findUser = selectedUsers.find(user => {
                console.log("Selected User List: ", user)
                // if user === firstname then update selectedUser
                user = firstName
            });
            console.log(findUser);
            selectedBox.className = "";
        }
    }

    if (currentUser) {
        let userList = selectedUsers.map(user => user);
        return (
            <div className="holder">
                <table width="100%">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                <h3>The Team</h3>
                            </td>
                            <td colSpan="1">
                            <Button as="input" type="button" value="Select All" className="select-all-btn" />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {userNames.map(userName => {
                            if (currentUser.uid !== userName.uid && userName) {
                                return (
                                    <tr key={userName.uid} rows="8">
                                        <td>
                                            <img src={UserIcon} alt="user-icon" className="user-icon"></img>
                                        </td>
                                        <td>{userName.username}</td>
                                        <td id={userName.uid}>
                                            <input type="checkbox" id={userName.username} onChange={handleClick} className=""/>
                                            <span></span>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                        <tr>
                            <td colSpan="3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" ref={messageRef} value={msgTo(userList.join(", "))}>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" ref={messageRef} defaultValue={defMsg}>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <input type="submit" value="Send Message" />
                            </td>
                        </tr>
                        </tbody>
                </table>
            </div>
        );
    } else {
        return null;
    }
}

export default ChatRoom;
