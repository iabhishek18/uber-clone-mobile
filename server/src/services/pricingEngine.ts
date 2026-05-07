interface PricingInput { distanceKm: number; durationMin: number; rideType: 'economy' | 'premium' | 'xl'; demandMultiplier?: number; }

interface PricingBreakdown { baseFare: number; distanceCharge: number; timeCharge: number; surgeMultiplier: number; surgeFee: number; subtotal: number; platformFee: number; tax: number; total: number; }

const RATES = {
  economy: { base: 50, perKm: 12, perMin: 2, minFare: 80 },
  premium: { base: 80, perKm: 20, perMin: 3.5, minFare: 150 },
  xl: { base: 100, perKm: 28, perMin: 4, minFare: 200 },
};

export function calculateFare(input: PricingInput): PricingBreakdown {
  const rate = RATES[input.rideType];
  const baseFare = rate.base;
  const distanceCharge = input.distanceKm * rate.perKm;
  const timeCharge = input.durationMin * rate.perMin;
  const surgeMultiplier = input.demandMultiplier ?? 1.0;
  const subtotal = Math.max((baseFare + distanceCharge + timeCharge) * surgeMultiplier, rate.minFare);
  const surgeFee = subtotal - (baseFare + distanceCharge + timeCharge);
  const platformFee = Math.round(subtotal * 0.20 * 100) / 100;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = Math.round((subtotal + platformFee + tax) * 100) / 100;

  return { baseFare, distanceCharge: Math.round(distanceCharge * 100) / 100, timeCharge: Math.round(timeCharge * 100) / 100, surgeMultiplier, surgeFee: Math.round(surgeFee * 100) / 100, subtotal: Math.round(subtotal * 100) / 100, platformFee, tax, total };
}

export function getSurgeMultiplier(activeRiders: number, availableDrivers: number): number {
  if (availableDrivers === 0) return 3.0;
  const ratio = activeRiders / availableDrivers;
  if (ratio <= 1) return 1.0;
  if (ratio <= 1.5) return 1.2;
  if (ratio <= 2) return 1.5;
  if (ratio <= 3) return 2.0;
  if (ratio <= 5) return 2.5;
  return 3.0;
}
