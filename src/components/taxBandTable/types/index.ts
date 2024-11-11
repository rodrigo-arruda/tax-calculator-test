export interface ITaxBandData {
  band: {
    min: number;
    max?: number;
    rate: number;
  };
  tax: number;
}

export interface ITaxTable {
  data: ITaxBandData[];
}
