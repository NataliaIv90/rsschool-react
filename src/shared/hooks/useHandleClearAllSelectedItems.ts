import { useDispatch } from 'react-redux';
import { clearAllSelectedItems } from '../../redux/slices/selectedItemsDetailsSlice';

export const useHandleClearAll = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(clearAllSelectedItems());
  };
};
