import { describe, it, expect } from 'vitest';
import { stations, trains, getTrainsForRoute, getStationByCode } from '@/lib/mockData';

describe('mockData', () => {
  it('has 20 stations', () => {
    expect(stations).toHaveLength(20);
  });

  it('has 5 trains', () => {
    expect(trains).toHaveLength(5);
  });

  it('getTrainsForRoute returns trains for valid route', () => {
    expect(getTrainsForRoute('EBM', 'IDU')).toHaveLength(5);
  });

  it('getTrainsForRoute returns empty for same station', () => {
    expect(getTrainsForRoute('EBM', 'EBM')).toHaveLength(0);
  });

  it('getStationByCode returns station or undefined', () => {
    const ebute = getStationByCode('EBM');
    expect(ebute?.name).toBe('Ebute Meta');
    expect(getStationByCode('XYZ')).toBeUndefined();
  });
});