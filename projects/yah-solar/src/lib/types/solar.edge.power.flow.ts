export interface SolarEdgePowerFlow {
  siteCurrentPowerFlow: {
    updateRefreshRate: number;
    unit: 'kW' | 'W';
    connections: [
      {
        from: string;
        to: string;
      }
    ];
    GRID: {
      status: 'Active' | 'Idle';
      currentPower: number;
    };
    LOAD: {
      status: 'Active' | 'Idle';
      currentPower: number;
    };
    PV: {
      status: 'Active' | 'Idle';
      currentPower: number;
    };
  };
}
