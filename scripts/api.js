export const getMoviesByTitle = async (title) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=a583816`);
        const data = await response.json();
        return data.Search;
    } catch (error) {
        console.log('error', error);
    }
}

export async function getEachMovieInfo(movieId) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=a583816&i=${movieId}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}