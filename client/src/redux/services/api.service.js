import axios from "axios"

export const token = localStorage.getItem( "token" );
export const role = localStorage.getItem( "role" );
export const base_url = 'url'

export const delay = async ( ms ) =>
    await new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve();
        }, ms );
    } );


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


export const fetchTestData = async () => {
    try {
        await delay( 2000 )
        const response = await axios.get( 'https://jsonplaceholder.typicode.com/todos' )
        return { response }
    } catch ( error ) {
        return { error }
    }
}