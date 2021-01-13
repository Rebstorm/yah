export interface YrNoWeatherForecast {
  properties: {
    timeseries: TimeSeries[];
  };
}

export interface TimeSeries {
  time: Date;
  data: {
    instant: {
      details: {
        air_temperature: number,
      }
    },
    next_12_hours: {
      summary: {
        symbol_code: string;
      }
    }
  };
}
