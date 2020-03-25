const subscribe = (target, event, listener) => {
  target.addEventListener(event, listener);

  return () => target.removeEventListener(event, listener);
};

export {subscribe};
