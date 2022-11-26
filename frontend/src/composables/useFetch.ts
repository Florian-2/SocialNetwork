import { ref, unref } from "vue" 
import axios, { AxiosError } from 'axios' 

export function useFetch(url: string)
{ 
    const data = ref<any[]>([]);
    const isLoading = ref(false);
    const error = ref<{ status: number, message: string }>();

    async function fetchData() 
    { 
        isLoading.value = true;
         
        try { 
            const res = await axios.get(unref(url));            
            data.value = res.data.posts;
            // console.log(res.data);
            
        }  
        catch (e) { 
            if (e instanceof AxiosError) {
                error.value = e.response?.data;
            }
        }  
        finally { 
            isLoading.value = false; 
        } 
    } 
    fetchData();

    return { 
        data,
        isLoading,
        error,
        fetchData 
    } 
}