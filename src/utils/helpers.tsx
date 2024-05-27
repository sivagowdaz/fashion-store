import levenshtein from 'js-levenshtein';
import { trendingTitles } from "./treding_titles";
import axios from 'axios';

interface TredArgs {
    title:string,
    url: string
}

export function getSimillarTrendList(input: string): TredArgs[] {
    const distances = trendingTitles.map(str => ({
      str,
      distance: levenshtein(input, str.title)
    }));
  
    distances.sort((a, b) => a.distance - b.distance);
  
    return distances.slice(0, 10).map(item => item.str);
}

export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

export async function getPhotos(count:number, search_str:string){
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${search_str}&per_page=${count}`, {
        headers: {
            'Authorization': API_KEY // Example header
          }
    })
    console.log(response.data)
    return response.data
}
