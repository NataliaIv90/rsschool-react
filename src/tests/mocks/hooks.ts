import { vi } from 'vitest';

// Mock the hooks used in FlyoutElement
vi.mock('../../shared/hooks/useHandleDownload', () => ({
  useHandleDownload: vi.fn(() => vi.fn()),
}));

vi.mock('../../shared/hooks/useHandleClearAllSelectedItems', () => ({
  useHandleClearAll: vi.fn(() => vi.fn()),
}));

vi.mock('../../shared/hooks/useGetSelectedItemsLength', () => ({
  useGetSelectedItemsNumber: vi.fn(),
}));
