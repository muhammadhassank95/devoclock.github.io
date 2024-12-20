import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map<string, any>();
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  keys(): IterableIterator<string> {
    return this.cache.keys();
  }

  values(): IterableIterator<any> {
    return this.cache.values();
  }

  entries(): IterableIterator<[string, any]> {
    return this.cache.entries();
  }

  size(): number {
    return this.cache.size;
  }
}
