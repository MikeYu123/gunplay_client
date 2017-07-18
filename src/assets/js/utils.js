/**
 * Created by mihailurcenkov on 18.07.17.
 */

export const toDegrees = angle => angle * (180 / Math.PI);
export const toRadians = angle => angle * (Math.PI / 180);
export const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );