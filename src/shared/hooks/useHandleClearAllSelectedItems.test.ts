import { describe, it, vi, expect, beforeEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHandleClearAll } from './useHandleClearAllSelectedItems';
import { useDispatch } from 'react-redux';
import { clearAllSelectedItems } from '../../redux/slices/selectedItemsDetailsSlice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

describe('useHandleClearAll', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear previous mocks before each test
  });

  it('should dispatch clearAllSelectedItems action when invoked', () => {
    const dispatch = vi.fn();
    (vi.mocked(useDispatch) as Mock).mockReturnValue(dispatch);

    const { result } = renderHook(() => useHandleClearAll());

    // Call the function returned by the hook
    act(() => {
      result.current();
    });

    // Assert that dispatch was called with clearAllSelectedItems action
    expect(dispatch).toHaveBeenCalledWith(clearAllSelectedItems());
  });
});
