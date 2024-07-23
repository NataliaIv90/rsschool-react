import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createAndDownloadFile } from './createAndDownloadFile';

describe('createAndDownloadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should create and download a file with the correct content and filename', () => {
    const csvContent = 'name,age\nJohn,30\nJane,25';
    const selectedItemsLength = 2;

    const mockCreateObjectURL = vi.fn().mockReturnValue('mock-url');
    global.URL.createObjectURL = mockCreateObjectURL;

    const mockLink = {
      setAttribute: vi.fn(),
      click: vi.fn(),
      style: { visibility: '' },
      download: 'test.csv',
    } as unknown as HTMLAnchorElement;
    const mockCreateElement = vi.fn().mockReturnValue(mockLink);
    document.createElement = mockCreateElement;

    const mockAppendChild = vi.fn();
    document.body.appendChild = mockAppendChild;
    const mockRemoveChild = vi.fn();
    document.body.removeChild = mockRemoveChild;

    createAndDownloadFile(csvContent, selectedItemsLength);

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'mock-url');
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      '2_selected_items.csv'
    );
    expect(mockLink.click).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
  });
});
