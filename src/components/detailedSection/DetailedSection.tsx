import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IStarWarsCharacter } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';
import { Loader } from '../../shared/components/loader/Loader';

export const DetailedView: React.FC = () => {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [character, setCharacter] = useState<IStarWarsCharacter | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/${name}/`);
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
  }, [name]);

  const handleClose = () => {
    navigate('/');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!character) {
    return (
      <div>
        <p>No character found.</p>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="detailed-section">
      <CharacterCard character={character} />
      <button className="btn" onClick={handleClose}>
        Close this card
      </button>
    </div>
  );
};
