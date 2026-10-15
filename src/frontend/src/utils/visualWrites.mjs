// Reassigning an unchanged attribute still wakes MutationObservers. Keep scroll
// and animation updates limited to values that actually changed.
export function writeData(element, key, value) {
  if (element.dataset[key] !== value) element.dataset[key] = value;
}

export function writeStyle(element, key, value) {
  if (element.style.getPropertyValue(key) !== value) element.style.setProperty(key, value);
}
