type IntersectionObserverCallback = (entrey: IntersectionObserverEntry, observer: IntersectionObserver) => void;
type CollectionMap = Map<Element, IntersectionObserverCallback>;

class IntersectionObservable {
  observer: null | IntersectionObserver = null;
  private collection: CollectionMap = new Map();
  private entriesCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    for (const entry of entries) {
      if (this.collection.has(entry.target)) {
        const callback = this.collection.get(entry.target);
        callback!(entry, observer);
      }
    }
  };
  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver(this.entriesCallback, options);
  }
  register(target: Element, callback: IntersectionObserverCallback) {
    const isRegistered = this.collection.has(target);
    this.collection.set(target, callback);
    if (!isRegistered) {
      this.observer?.observe(target);
    }
  }
  unregister(target: Element) {
    this.collection.delete(target);
    this.observer?.unobserve(target);
  }
  disconnect() {
    this.collection.clear();
    this.observer?.disconnect();
  }
}

export default IntersectionObservable;