const EXPIRE_TIME = 10000000;
const MAX_SIZE = 10000;

interface CacheData<T> {
  [key: string]: ValueData<T>;
}

interface ValueData<T> {
  value: T;
  // To Expire Data after specific time
  expiry: number;
  // size of value
  size: number;
}

// Prototype for Caching Data
class cacheProto<T> {
  private data: CacheData<T>;
  private totalSize: number;
  private maxAge: number;
  private maxSize: number;

  constructor(maxAge?: number, maxSize?: number) {
    this.data = {};
    this.totalSize = 0;
    this.maxAge = maxAge || EXPIRE_TIME;
    this.maxSize = maxSize || MAX_SIZE;
  }

  // check if there is Data with Cache Key
  has = (key: string): boolean => {
    if (this.data[key]) {
      if (this.data[key].expiry > new Date().getTime()) {
        return true;
      }
      this.delete(key); // Expires data
    }
    return false;
  };

  // Get Value from Data by Its key
  get = (key: string): T | null => {
    return this.data[key]?.value;
  };

  // Set new Value with Key
  set = (key: string, value: T, size: number) => {
    if (this.has(key)) {
      // if it's already stored and update it
      const prevSize = this.data[key].size;
      prevSize ? (this.totalSize -= prevSize) : (this.totalSize -= 1);
    }
    const valueSize = size;
    if (valueSize + this.totalSize < this.maxSize) {
      this.totalSize += valueSize;
      this.data[key] = {
        value,
        expiry: new Date().getTime() + this.maxAge,
        size,
      };
    }
  };

  // Delete (G.C) Data by Key
  delete = (key: string) => {
    this.totalSize -= this.data[key].size;
    delete this.data[key];
  };

  // Clear all Datas
  clear = () => {
    this.data = {};
    this.totalSize = 0;
  };

  // get total Size of cache
  getSize = () => {
    return this.totalSize;
  };
}

export default cacheProto;
