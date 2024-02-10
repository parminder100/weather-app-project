export const FetchNewsApi = async() =>{
    const apiKey = process.env.NEXT_PUBLIC_WORLD_NEWS_API_KEY;
    const response = await fetch(`https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=weather`);
    const data = await response.json();
    return data;
}