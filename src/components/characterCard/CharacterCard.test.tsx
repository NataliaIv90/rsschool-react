import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterCard from './CharacterCard';
import { ThemeProvider } from '@/shared/context/themeContext/ThemeContext';
import { mockedCharacter } from '@/tests/mocks/mock';
import { EContextValue } from '@/types/types';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider> {children} </ThemeProvider>
);

describe('CharacterCard', () => {
  it('should render the character name', () => {
    render(
      <ThemeProviderWrapper>
        <CharacterCard character={mockedCharacter} />
      </ThemeProviderWrapper>
    );

    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === 'h2' &&
          content.includes(mockedCharacter.name)
      )
    ).toBeInTheDocument();
  });

  it('should apply the dark theme class when the theme is dark', () => {
    vi.mock('../../shared/context/themeContext/useTheme', () => ({
      useTheme: () => ({ theme: EContextValue.DARK }),
    }));

    render(
      <ThemeProviderWrapper>
        <CharacterCard character={mockedCharacter} />
      </ThemeProviderWrapper>
    );

    expect(screen.getByRole('article')).toHaveClass('dark');
  });
});
