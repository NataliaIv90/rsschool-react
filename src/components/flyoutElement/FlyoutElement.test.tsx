import { screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';

import { FlyoutElement } from './FlyoutElement';
import { useGetSelectedItemsNumber } from '@/shared/hooks/useGetSelectedItemsLength';
import renderWithProviders from '@/tests/renderWithProviders';

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
  it('does not render when there are no selected items', () => {
    (useGetSelectedItemsNumber as Mock).mockReturnValue(0);

    renderWithProviders(<FlyoutElement />);

    expect(screen.queryByText('items are selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Unselect All')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });
});
