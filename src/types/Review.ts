export interface ReviewDataType {
  userId: string;
  hasParkingLot: 'yes' | 'no' | 'dontknow1';
  hasOffLeash: 'available' | 'notAvailable' | 'dontknow2';
  Recommendation: 'good' | 'soso' | 'bad';
  freeComment: string;
  imageList: string[];
  coordinateX: string;
  coordinateY: string;
}
