// Stub for debug package - prevents CommonJS module error in Vite 7 SSR
export default function debug() {
  return () => {};
}
export const enabled = false;
export const humanize = (n) => n;
export const formatArgs = () => {};
export const selectColor = () => 0;
export const log = () => {};
export const formatters = {};
