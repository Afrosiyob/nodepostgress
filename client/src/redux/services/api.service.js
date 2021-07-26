import axios from "axios";

export const delay = async(ms) =>
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

// export const fetchWithDelay = async () => {
//     try {
//         await delay( 300 );
//         const response = await axios.get( 'url' );
//         return { response };
//     } catch ( error ) {
//         return { error };
//     }
// };

// export const fetchWithoutDelay = async () =>
//     await axios.get( url )
//         .then( ( response ) => ( { response } ) )
//         .catch( ( error ) => ( { error } ) )

export const fetchTestData = async() => {
    try {
        await delay(2000);
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        return { response };
    } catch (error) {
        return { error };
    }
};

export const fetchAuthLogin = async(request) =>
    await axios
    .post("/api/auth/login", request)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchAuthMe = async() => {
    const token = localStorage.getItem("token");
    return await axios
        .get("/api/auth/me", {
            headers: {
                Authorization: token,
            },
        })
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
};

export const fetchAuthLogout = async() => {
    const token = localStorage.getItem("token");
    return await axios
        .get("/api/auth/logout", {
            headers: {
                Authorization: token,
            },
        })
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
};

export const fetchAuthRegistration = async(request) =>
    await axios
    .post("/api/user/create", request)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));