const EXPIRE_TIME = 10000000;

interface CacheData<T> {
  value: T;
  // To Expire Data after specific time
  expiry: number;
}

// Prototype for Caching Data
class cacheProto<T> {
  private data: CacheData<T>[];

  constructor() {
    this.data = [];
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
  get = (key: string): T => {
    return this.data[key].value;
  };

  // Set Value with Key
  set = (key: string, value: T) => {
    this.data[key] = {
      value,
      expiry: new Date().getTime() + EXPIRE_TIME,
    };
  };

  // Delete (G.C) Data by Key
  delete = (key: string) => {
    delete this.data[key];
  };
}

export default cacheProto;
