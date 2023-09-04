export interface Deserializable<T> {
  deserialize: (input: Record<string, any>) => T;
}
