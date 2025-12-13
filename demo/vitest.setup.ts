import { vi, beforeEach, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

globalThis.fetch = vi.fn();

const originalLocation = window.location;

beforeEach(() => {
  const mockLocation: Location = {
    ...originalLocation,
    href: 'http://localhost:5173',
    origin: 'http://localhost:5173',
    search: '',
    assign: vi.fn(),
    replace: vi.fn(),
  };

  Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
