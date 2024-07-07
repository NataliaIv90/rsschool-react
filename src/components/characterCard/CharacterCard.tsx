import React from 'react'; // Assuming you have defined the interface in a separate file
import { IStarWarsCharacter } from '../searchPage/SearchPage';

interface CharacterCardProps {
  character: IStarWarsCharacter;
}

class CharacterCard extends React.Component<CharacterCardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="character-card">
        <h2>{character.name}</h2>
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>
      </div>
    );
  }
}

export default CharacterCard;
