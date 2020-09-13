// Script from https://www.tutorialspoint.com/how-to-create-guid-uuid-in-javascript
// Typing adding by Antonio. The variables are nondescript because that's how they came
// These feel a little long for my use, so I'm going to edit the original string from
// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx => xxxxxxxx-xxxx-4xxx-yxxx

/**
 * createUUID
 */
export const createUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (c: string) => {
  let r: number = Math.random() * 16 | 0, v: number = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
export default createUUID();
