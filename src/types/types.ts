import { ReactNode, JSX } from 'react';

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

export type TVoidFunction = () => void;

export type TOnSearchTermChange = (searchTerm: string) => void;

export interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: TOnSearchTermChange;
  onSearch: TVoidFunction;
  // isLoading: boolean;
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

export type TOnSubmitFunction = (
  event:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type TOnChangeFunction = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type TSearchForm = {
  handleFormSubmit: TOnSubmitFunction;
  searchTerm: string;
  handleInputChange: TOnChangeFunction;
};

export type TResponseData = {
  count?: number;
  next?: string;
  previous?: string;
  results?: IStarWarsCharacter[] | IStarWarsCharacter;
  detail?: string;
};

export type TApiQueryProps = {
  page: string;
  searchTerm: string;
};

export type TSearchProps = {
  children?: ReactNode;
  handleSearch: TVoidFunction;
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => Promise<void>;
  results?: TResponseData;
  handleCharacterSelect: (id: string) => void;
  params: TParams;
  handlePageChange: (page: number) => void;
};

export type TParams = {
  page: string;
};

export enum EContextValue {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface ThemeContextType {
  theme: EContextValue;
  toggleTheme: () => void;
}
