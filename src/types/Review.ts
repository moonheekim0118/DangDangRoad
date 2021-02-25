export interface ReviewDataType {
  userId: string;
  hasParkingLot: string;
  hasOffLeash: string;
  recommendation: string;
  freeText: string;
  imageList: string[] | null;
  coordinateX: string;
  coordinateY: string;
}
