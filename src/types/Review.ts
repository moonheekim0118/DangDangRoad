export interface ReviewDataType {
  userId: string;
  hasParkingLot: string;
  hasOffLeash: string;
  recommendation: string;
  freeText: string;
  imageList: string[];
  placeInfo: {
    address_name: string;
    place_name: string;
    x: string;
    y: string;
  };
  createdAt: any;
}
