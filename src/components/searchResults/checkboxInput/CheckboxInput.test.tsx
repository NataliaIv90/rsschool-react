import { describe, it, expect, vi, MockedFunction } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckboxInput } from './CheckboxInput';
import { IStarWarsCharacter } from '@/types/types';
import { mockedCharacter } from '@/tests/mocks/mock';
import { setSelectedItem, removeSelectedItemByName } from '@/redux/slices';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('@/redux/slices/selectedItemsDetailsSlice', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    setSelectedItem: (character: IStarWarsCharacter) => ({
      type: 'selectedItemDetails/setSelectedItem',
      payload: character,
    }),
    removeSelectedItemByName: (name: string) => ({
      type: 'selectedItemDetails/removeSelectedItemByName',
      payload: name,
    }),
  };
});

describe('CheckboxInput', () => {
  it('should render the checkbox with correct checked state', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({
      [mockedCharacter.name]: true,
    });

    render(<CheckboxInput character={mockedCharacter} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('should dispatch setSelectedItem when checkbox is checked', () => {
    const mockDispatch = vi.fn();
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(
      mockDispatch
    );
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({
      [mockedCharacter.name]: false,
    });

    render(<CheckboxInput character={mockedCharacter} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedItem(mockedCharacter));
  });

  it('should dispatch removeSelectedItemByName when checkbox is unchecked', () => {
    const mockDispatch = vi.fn();
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(
      mockDispatch
    );
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({
      [mockedCharacter.name]: true,
    });

    render(<CheckboxInput character={mockedCharacter} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      removeSelectedItemByName(mockedCharacter.name)
    );
  });

  it('should update checked state when selectedItems changes', () => {
    const mockDispatch = vi.fn();
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(
      mockDispatch
    );
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({
      [mockedCharacter.name]: false,
    });

    const { rerender } = render(<CheckboxInput character={mockedCharacter} />);
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({
      [mockedCharacter.name]: true,
    });
    rerender(<CheckboxInput character={mockedCharacter} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
