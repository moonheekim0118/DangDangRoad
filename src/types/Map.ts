export interface PlaceType {
  address_name: string;
  place_name: string;
  road_address_name?: string;
  x: string;
  y: string;
}

export interface PaginationType {
  totalCount: number;
  current: number;
  first: number;
  last: number;
  perPage: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (a: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}
