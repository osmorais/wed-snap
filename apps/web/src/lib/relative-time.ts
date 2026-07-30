const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
];

export function formatRelativeTime(isoDate: string): string {
  const diffSeconds = (Date.now() - new Date(isoDate).getTime()) / 1000;

  if (diffSeconds < 60) return 'agora mesmo';

  for (const [unit, secondsInUnit] of UNITS) {
    const value = Math.floor(diffSeconds / secondsInUnit);
    if (value >= 1) return rtf.format(-value, unit);
  }

  return 'agora mesmo';
}
