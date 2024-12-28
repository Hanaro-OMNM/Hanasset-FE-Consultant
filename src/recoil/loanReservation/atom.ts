import { atom } from 'recoil';
import { selectedEstateType } from '../../types/hanaAsset';

interface LoanReservationState {
  reservationInfo: selectedEstateType[];
  reservationTime: undefined | string;
}

const loanReservationAtom = atom<LoanReservationState>({
  key: 'loanReservationAtom',
  default: {
    reservationInfo: [],
    reservationTime: undefined,
  },
});

export default loanReservationAtom;
