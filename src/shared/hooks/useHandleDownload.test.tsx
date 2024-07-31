import { describe, it, vi, expect, beforeEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHandleDownload } from './useHandleDownload';

const createCSVRows = vi.fn();
const createAndDownloadFile = vi.fn();
const useSelector = vi.fn();

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('useHandleDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not call createAndDownloadFile when there are no selected items', () => {
    (vi.mocked(useSelector) as Mock).mockReturnValue({});

    const { result } = renderHook(() => useHandleDownload());

    act(() => {
      result.current();
    });

    expect(createCSVRows).not.toHaveBeenCalled();
    expect(createAndDownloadFile).not.toHaveBeenCalled();
  });
});
