import { describe, expect, test, vi } from 'vitest';
import { scrollToTop } from './scrollToTop';

describe('scrollToTop', () => {
  test('should call window.scrollTo with correct parameters', () => {
    window.scrollTo = vi.fn();

    scrollToTop();

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
