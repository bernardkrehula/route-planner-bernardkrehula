import axios from "axios"


export const requestCordinates = async(destination: string) => {
    try{
        const response = await axios.get(`https://api.openrouteservice.org/geocode/search?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJiMmQ0ZTllYmNkNDQ2ZWVhYTZhOWE0Yzc5Mzc0N2FhIiwiaCI6Im11cm11cjY0In0=&text=${destination}`)
        return response.data
    }   
    catch(error){
        console.error(error)
    }
}