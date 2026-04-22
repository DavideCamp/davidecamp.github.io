export const WORKFLOW_SECTION_IDS = ['hero', 'come-funziona', 'servizi', 'casi-uso', 'contatti'] as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const getWorkflowMarker = () => {
  const topBar = document.querySelector('header');
  const topBarHeight = topBar ? topBar.getBoundingClientRect().height : 0;
  return window.scrollY + topBarHeight + 72;
};

export const getWorkflowProgressFromCenters = (marker: number, centers: number[]) => {
  if (centers.length < 2) return 0;

  if (marker <= centers[0]) return 0;
  if (marker >= centers[centers.length - 1]) return 1;

  let segment = 0;
  for (let i = 0; i < centers.length - 1; i += 1) {
    if (marker >= centers[i] && marker < centers[i + 1]) {
      segment = i;
      break;
    }
  }

  const start = centers[segment];
  const end = centers[segment + 1];
  const local = clamp((marker - start) / Math.max(end - start, 1), 0, 1);
  return clamp((segment + local) / (centers.length - 1), 0, 1);
};

export const getRunningIndex = (progress: number, length: number) => {
  if (length <= 0) return 0;
  return Math.min(Math.floor(progress * (length - 1) + 1e-4), length - 1);
};

export const getWorkflowAnchorPositions = () => {
  return WORKFLOW_SECTION_IDS.map((id) => {
    const anchor = document.getElementById(`workflow-anchor-${id}`);
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      return rect.top + window.scrollY;
    }

    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      return rect.top + window.scrollY;
    }

    return null;
  }).filter((value): value is number => value !== null);
};
