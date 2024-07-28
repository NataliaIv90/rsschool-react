import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { FlyoutElement } from './FlyoutElement';
import { useHandleDownload } from '../../shared/hooks/useHandleDownload';
import { useHandleClearAll } from '../../shared/hooks/useHandleClearAllSelectedItems';
import { useGetSelectedItemsNumber } from '../../shared/hooks/useGetSelectedItemsLength';

vi.mock('../../shared/hooks/useHandleDownload', () => ({
  useHandleDownload: vi.fn(() => vi.fn()),
}));

vi.mock('../../shared/hooks/useHandleClearAllSelectedItems', () => ({
  useHandleClearAll: vi.fn(() => vi.fn()),
}));

vi.mock('../../shared/hooks/useGetSelectedItemsLength', () => ({
  useGetSelectedItemsNumber: vi.fn(),
}));

describe('FlyoutElement Component', () => {
  it('renders correctly when there are selected items', () => {
    (useGetSelectedItemsNumber as Mock).mockReturnValue(5);
    const handleDownload = vi.fn();
    const handleClearAll = vi.fn();
    (useHandleDownload as Mock).mockReturnValue(handleDownload);
    (useHandleClearAll as Mock).mockReturnValue(handleClearAll);

    render(<FlyoutElement />);

    expect(screen.getByText('5 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect All')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('does not render when there are no selected items', () => {
    (useGetSelectedItemsNumber as Mock).mockReturnValue(0);

    render(<FlyoutElement />);

    expect(screen.queryByText('items are selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Unselect All')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });

  it('calls handleClearAll when Unselect All button is clicked', () => {
    (useGetSelectedItemsNumber as Mock).mockReturnValue(5);
    const handleClearAll = vi.fn();
    (useHandleClearAll as Mock).mockReturnValue(handleClearAll);

    render(<FlyoutElement />);

    fireEvent.click(screen.getByText('Unselect All'));

    expect(handleClearAll).toHaveBeenCalled();
  });

  it('calls handleDownload when Download button is clicked', () => {
    (useGetSelectedItemsNumber as Mock).mockReturnValue(5);
    const handleDownload = vi.fn();
    (useHandleDownload as Mock).mockReturnValue(handleDownload);

    render(<FlyoutElement />);

    fireEvent.click(screen.getByText('Download'));

    expect(handleDownload).toHaveBeenCalled();
  });
});
