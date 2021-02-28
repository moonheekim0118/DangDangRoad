export interface NavigationInfo {
  hasPrev: boolean;
  /** next Available */
  hasNext: boolean;
  /** goToPrevHandler */
  prevHandler: () => void;
  /** goToNextHandler */
  nextHandler: () => void;
  /** Buttons location */
  location?: number;
}
