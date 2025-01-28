import { generateUniqueId, getDeviceType, getClicksByDate, processData } from './misc';  // Adjust the import path as necessary

describe('Utility Functions', () => {
  
  describe('generateUniqueId', () => {
    it('should generate a unique string ID of length 5', () => {
      const id = generateUniqueId();
      expect(id).toHaveLength(5);
      expect(id).toMatch(/^[a-f0-9]{5}$/);  // Check if the ID is hexadecimal
    });
  });

  describe('getDeviceType', () => {
    it('should return "Mobile" for mobile devices', () => {
      expect(getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36')).toBe('Mobile');
    });

    it('should return "Tablet" for tablet devices', () => {
      expect(getDeviceType('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/537.36')).toBe('Tablet');
    });

    it('should return "Desktop" for other devices', () => {
      expect(getDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')).toBe('Desktop');
    });
  });

  describe('getClicksByDate', () => {
    it('should return the number of clicks per date', async () => {
      const data = [
        { timestamp: '2025-01-25T12:00:00Z' },
        { timestamp: '2025-01-25T14:00:00Z' },
        { timestamp: '2025-01-26T12:00:00Z' },
      ];
      const result = await getClicksByDate(data);
      console.log("result",result);
      
      expect(result['25/1/2025']).toBe(2);
      expect(result['26/1/2025']).toBe(1);
    });
  });

  describe('processData', () => {
    it('should return unique clicks and unique users by key', () => {
      const data = [
        { deviceName: 'Windows', ipAddress: '192.168.0.1' },
        { deviceName: 'Windows', ipAddress: '192.168.0.2' },
        { deviceName: 'Windows', ipAddress: '192.168.0.1' },
        { deviceName: 'Mac', ipAddress: '192.168.0.3' },
      ];
      const result = processData(data, 'deviceName');
      expect(result).toEqual([
        { osName: 'Windows', uniqueClicks: 3, uniqueUsers: 2 },
        { osName: 'Mac', uniqueClicks: 1, uniqueUsers: 1 },
      ]);
    });

    it('should use "osName" instead of "deviceName" if specified', () => {
      const data = [
        { osName: 'Windows', ipAddress: '192.168.0.1' },
        { osName: 'Windows', ipAddress: '192.168.0.2' },
        { osName: 'Mac', ipAddress: '192.168.0.3' },
      ];
      const result = processData(data, 'osName');
      expect(result).toEqual([
        { osName: 'Windows', uniqueClicks: 2, uniqueUsers: 2 },
        { osName: 'Mac', uniqueClicks: 1, uniqueUsers: 1 },
      ]);
    });
  });

});
