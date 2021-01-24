export interface CleaningStatus {
  cleanMissionStatus: {
    phase: string;
  };

  bin: {
    present: boolean;
  };

  batPct: number;
}
