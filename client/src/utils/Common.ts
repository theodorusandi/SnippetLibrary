// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout | string | number | undefined;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}