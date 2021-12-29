import React, { useEffect, useState } from 'react';
import { requestForToken } from '../firebase';

const Notifications = () => {
    const [isTokenFound, setTokenFound] = useState(false);

    console.log("Token found", isTokenFound);

    useEffect(() => {
        let data;

        async function tokenFunc() {
            data = await requestForToken(setTokenFound);
            if (data) {
            console.log("Token is", data);
            }
            return data;
        }

        tokenFunc();
    }, [setTokenFound]);

    return <></>;
};

Notifications.propTypes = {};

export default Notifications;
