export type RideState = 'requested' | 'accepted' | 'arriving' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

const validTransitions: Record<RideState, RideState[]> = {
  requested: ['accepted', 'cancelled'],
  accepted: ['arriving', 'cancelled'],
  arriving: ['arrived', 'cancelled'],
  arrived: ['in_progress', 'cancelled'],
  in_progress: ['completed'],
  completed: [],
  cancelled: [],
};

export function canTransition(from: RideState, to: RideState): boolean {
  return validTransitions[from]?.includes(to) ?? false;
}

export function validateTransition(from: RideState, to: RideState): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid state transition: ${from} → ${to}. Allowed: ${validTransitions[from]?.join(', ') || 'none'}`);
  }
}
