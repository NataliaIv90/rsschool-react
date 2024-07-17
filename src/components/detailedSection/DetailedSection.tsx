import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IStarWarsCharacter } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';
import { Loader } from '../../shared/components/loader/Loader';
import { Button } from '../../shared/components/button/Button';

export const DetailedView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [character, setCharacter] = useState<IStarWarsCharacter | null>(null);
  const [isLoading, setLoading] = useState(true);

  const params = {
    page: searchParams.get('page') || '1',
    id: searchParams.get('id') || '',
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://swapi.dev/api/people/${params.id}/`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch character');
        }
        const data: IStarWarsCharacter = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [params.id]);

  const handleClose = () => {
    navigate(`/?page=${params.page}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!character || !params.id) {
    return (
      <div>
        <p>No character found.</p>
        <Button text="Close" onClick={handleClose} />
      </div>
    );
  }

  return (
    <div className="detailed-section">
      <CharacterCard character={character} />
      <Button text="Close card" onClick={handleClose} />
    </div>
  );
};
