export interface VolumetricCalculation {
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  totalCbm: number;
  isVolumetricHigher: boolean;
}

export function calculateShipmentMetrics(params: {
  actualWeightKg: number;
  packageCount: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  cargoType: string;
}): VolumetricCalculation {
  const actual = Math.max(0, params.actualWeightKg || 0);
  const count = Math.max(1, params.packageCount || 1);
  const l = params.lengthCm || 0;
  const w = params.widthCm || 0;
  const h = params.heightCm || 0;

  let totalCbm = 0;
  let volumetricWeightKg = 0;

  if (l > 0 && w > 0 && h > 0) {
    const singleBoxCbm = (l * w * h) / 1_000_000;
    totalCbm = Number((singleBoxCbm * count).toFixed(3));

    // Standard IATA air cargo divisor: (L * W * H in cm) / 5000 per box
    const singleBoxVolumetric = (l * w * h) / 5000;
    volumetricWeightKg = Number((singleBoxVolumetric * count).toFixed(2));
  }

  const chargeableWeightKg = Math.max(actual, volumetricWeightKg);

  return {
    actualWeightKg: actual,
    volumetricWeightKg,
    chargeableWeightKg,
    totalCbm,
    isVolumetricHigher: volumetricWeightKg > actual,
  };
}
