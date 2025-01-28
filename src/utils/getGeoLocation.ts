import axios from "axios";

export const getGeolocation = async (ipAddress: string) => {
    try {
        const response: any = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        if (response.data?.status === "fail") {
            throw new Error("Error fetching geolocation");
        }
        return { status: true, country: response.data.country }
    }
    catch (error) {
        console.error('Error fetching geolocation:', error);
        return { status: false, error }
    }
}