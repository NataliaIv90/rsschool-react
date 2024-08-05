'use client';

import {
  ChangeEvent,
  FunctionComponent,
  JSX,
  useState,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStarWarsCharacter } from '@/types/types';
import { RootState } from '@/redux/store';
import { setSelectedItem, removeSelectedItemByName } from '@/redux/slices';

type ICheckboxInputProps = {
  character: IStarWarsCharacter;
};

export const CheckboxInput: FunctionComponent<ICheckboxInputProps> = ({
  character,
}): JSX.Element => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItemDetails.items
  );
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<boolean>(
    Boolean(selectedItems && selectedItems[character.name])
  );

  useEffect(() => {
    setSelected(Boolean(selectedItems && selectedItems[character.name]));
  }, [selectedItems, character.name]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    setSelected(isChecked);

    if (isChecked) {
      dispatch(setSelectedItem(character));
    } else {
      dispatch(removeSelectedItemByName(character.name));
    }
  };

  return (
    <input
      className="search-results-checkbox"
      type="checkbox"
      name="selected-character"
      id={character.name.replaceAll(' ', '')}
      onChange={handleCheckboxChange}
      checked={selected}
    />
  );
};
