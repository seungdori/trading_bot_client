export type MockData = {
  id: string;
  name: string;
  age: number;
};

export async function getMockHistoryData(): Promise<MockData[]> {
  return [
    { id: '1', name: 'History John', age: 30 },
    { id: '2', name: 'History Jane', age: 25 },
    { id: '3', name: 'History Doe', age: 40 },
  ];
}

export async function getMockAssetsData(): Promise<MockData[]> {
  return [
    { id: '1', name: 'Assets John', age: 30 },
    { id: '2', name: 'Assets Jane', age: 25 },
    { id: '3', name: 'Assets Doe', age: 40 },
  ];
}
