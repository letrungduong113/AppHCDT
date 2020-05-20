export const UPDATE_MARKERS = 'UPDATE_MARKERS';


export function updateMarkers(markers):Action {
  return {
    type: UPDATE_MARKERS,
    markers
  };
}
