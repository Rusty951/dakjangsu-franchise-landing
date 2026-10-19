// Keep preparation attached to the actual image node. Unmounting releases the
// entry, while leaving a chapter does not discard a successful decode.
const prepared = new WeakMap();

export function decodePoseImage(image) {
  const source = image.getAttribute('src');
  const existing = prepared.get(image);
  if (existing?.source === source) return existing.promise;

  const entry = { source };
  entry.promise = Promise.resolve().then(() => image.decode()).catch(error => {
    // A failed load must remain retryable on the next visit.
    if (prepared.get(image) === entry) prepared.delete(image);
    throw error;
  });
  prepared.set(image, entry);
  return entry.promise;
}
