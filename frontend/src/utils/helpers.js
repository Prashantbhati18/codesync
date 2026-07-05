// Small formatting helpers reused across pages/components.
export const formatDate = (isoString) =>
  new Date(isoString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export const durationLabel = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};
