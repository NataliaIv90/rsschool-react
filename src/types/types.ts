import { ReactNode } from 'react';

export interface ICharacterCardProps {
  character: IStarWarsCharacter;
}

export interface IStarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export interface SearchResultsProps {
  results: IStarWarsCharacter[];
}

export interface IPagination {
  currentPage: number;
  count: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface DetailedSectionProps {
  character: IStarWarsCharacter;
  onClose: () => void;
}

export interface SearchResultsProps {
  results: IStarWarsCharacter[];
  onCharacterSelect: (id: string) => void;
}
