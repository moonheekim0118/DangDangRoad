const EXPIRE_TIME = 10000000;

// To Expire Data after specific time
interface CacheData<T> {
  value: T;
  expiry: number;
}

// Cache Interface Data Type
interface CacheInterface<T> {
  data: CacheData<T>[];
  has: (key: string) => boolean;
  get: (key: string) => T;
  set: (key: string, value: T) => void;
  delete: (key: string) => void;
}

// Prototype for Caching Data
function cacheProto<T>(this: CacheInterface<T>) {
  this.data = [];

  // check if there is Data with Cache Key
  this.has = (key: string): boolean => {
    if (this.data[key]) {
      if (this.data[key].expiry > new Date().getTime()) {
        return true;
      }
      this.delete(key); // Expires data
    }
    return false;
  };

  // Get Value from Data by Its key
  this.get = (key: string): T => {
    return this.data[key].value;
  };

  // Set Value with Key
  this.set = (key: string, value: T) => {
    this.data[key] = {
      value,
      expiry: new Date().getTime() + EXPIRE_TIME,
    };
  };

  // Delete (G.C) Data by Key
  this.delete = (key: string) => {
    delete this.data[key];
  };
}

export default cacheProto;
