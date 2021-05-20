export interface NavigationInfo {
  hasPrev: boolean;
  /** next Available */
  hasNext: boolean;
  /** goToPrevHandler */
  onClickPrev: () => void;
  /** goToNextHandler */
  onClickNext: () => void;
  /** Buttons location */
  location?: number;
}
