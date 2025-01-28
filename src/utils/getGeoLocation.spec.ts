import { getGeolocation } from './getGeoLocation';
import axios from 'axios';

jest.mock('axios');

describe('getGeolocation', () => {
    const mockIp = '103.182.166.50';

    it('should return geolocation data for a valid IP', async () => {
        const mockResponse = {
            data: {
                status: 'success',
                country: 'India'
            }
        };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);

        const result = await getGeolocation(mockIp);

        expect(axios.get).toHaveBeenCalledWith(`http://ip-api.com/json/${mockIp}`);
        expect(result).toEqual({ status: true, country: 'India' });
    });

    it('should handle API failure response', async () => {
        const mockResponse = {
            data: {
                status: 'fail',
            }
        };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);

        const result = await getGeolocation(mockIp);

        expect(axios.get).toHaveBeenCalledWith(`http://ip-api.com/json/${mockIp}`);
        expect(result).toEqual({ status: false, error: new Error('Error fetching geolocation') });
    });

    it('should handle network or other errors', async () => {
        const mockError = new Error('Network error');
        (axios.get as jest.Mock).mockRejectedValue(mockError);

        const result = await getGeolocation(mockIp);

        expect(axios.get).toHaveBeenCalledWith(`http://ip-api.com/json/${mockIp}`);
        expect(result).toEqual({ status: false, error: mockError });
    });
});
