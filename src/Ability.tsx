import { Typography } from '@mui/material';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export interface AbilityProps {
  ability?: PokemonTCG.Ability;
}

export default function Ability(props: AbilityProps) {
  if (props.ability == null) {
    return null;
  }

  return (
    <Typography><Typography component="span" fontWeight="bold">{props.ability.name}</Typography> {props.ability.text}</Typography>
  );
}
