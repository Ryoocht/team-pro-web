import React, { useEffect, useState, useRef } from 'react';
import "../style/Home.css";
import { firestore } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import UserIcon from "../image/user-solid.svg";
import { Button } from "react-bootstrap"; 

const ChatRoom = () => {
    const { currentUser } = useAuth();
    const [ userNames, setUserNames ] = useState([]);
    const titleRef = useRef("");
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

    const handleSelectAll = e => {
        const selectAllBtn = document.getElementById(e.target.id);
        const allCheckBoxies = document.getElementsByName("select-all");
        const toggleBtn = e.target.id;
        setSelectedUsers("");

        if (toggleBtn === "deselect") {
            allCheckBoxies.forEach(checkbox => {
                checkbox.checked = true;
                const selectedUid = checkbox.parentNode.id;
                const firstName = checkbox.id.split(" ")[0];
                setSelectedUsers(prevState => [...prevState, {firstName:firstName, uid: selectedUid}]);
            });
            selectAllBtn.id = "select";
        } else {
            allCheckBoxies.forEach(checkbox => {
                checkbox.checked = false;
                setSelectedUsers([]);
            });
            selectAllBtn.id = "deselect";
        }
    }

    const handleClick = e => {
        const selectedBox = document.getElementById(e.target.id);
        const selectedUid = selectedBox.parentNode.id;
        const firstName = e.target.id.split(" ")[0];

        if (selectedBox.checked) {
            setSelectedUsers([...selectedUsers, {firstName: firstName, uid: selectedUid}]);
        } else {
            const findUser = selectedUsers.filter(user => {
                return user.firstName !== firstName
            });
            setSelectedUsers(findUser);
        }
    }

    const handleSendMessage = () => {
        firestore.collection("messages").add({
            title: titleRef.current.value,
            message: messageRef.current.value,
            createdAt: new Date(),
            sender: currentUser.uid,
            receiver: selectedUsers.map(user => user.uid)
        })
        .then(result => alert("The Message has been sent!"))
        .catch(error => console.error(error));
    }

    if (currentUser) {
        let userList = selectedUsers.map(user => user.firstName);
        return (
            <div className="holder">
                <table width="100%">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                <h3>The Team</h3>
                            </td>
                            <td colSpan="1">
                            <Button as="input" type="button" value="Select All" className="select-all-btn" id="deselect" onClick={handleSelectAll} />
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
                                            <input type="checkbox" name="select-all" id={userName.username} onChange={handleClick} />
                                            <span></span>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                        <tr>
                            <td colSpan="3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" ref={titleRef} value={msgTo(userList.join(", "))}>
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
                                <input type="submit" value="Send Message" onClick={handleSendMessage} />
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
