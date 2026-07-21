export function parseFiniteNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) {
    throw new TypeError("Expected a finite numeric value.");
  }

  return parsed;
}
