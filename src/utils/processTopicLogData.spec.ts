import { timeStamp } from 'console';
import { processTopicLogData } from './processTopicLogData'; 

describe('processTopicLogData', () => {
  it('should correctly process topic log data', () => {
    const data = [
        { ipAddress: '192.168.0.1', alias: 'shortUrl1', timestamp: '2025-01-25T12:00:00Z' },
        { ipAddress: '192.168.0.2', alias: 'shortUrl1', timestamp: '2025-01-25T14:00:00Z' },
        { ipAddress: '192.168.0.3', alias: 'shortUrl2', timestamp: '2025-01-25T08:30:00Z' },
        { ipAddress: '192.168.0.3', alias: 'shortUrl2', timestamp: '2025-01-25T16:45:00Z' },
      ];

    const clicksByDateMock = { '25/1/2025': 4 };

    const result = processTopicLogData(data,[]);

    expect(result.totalClicks).toBe(4);
    expect(result.uniqueUsers).toBe(3);
    expect(result.clicksByDate).toEqual(clicksByDateMock);
    expect(result.urls).toEqual([
      { shortUrl: 'shortUrl1', totalClicks: 2, uniqueUsers: 2 },
      { shortUrl: 'shortUrl2', totalClicks: 2, uniqueUsers: 1 },
    ]);
  });
});


