import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import PokemonTypeDisplay, { PokemonType } from './PokemonType';

export interface WeaknessResistanceProps {
  weaknesses?: PokemonTCG.Weakness[];
  resistances?: PokemonTCG.Resistance[];
}

interface SingleItemProps {
  type: PokemonType;
  value: string;
}

function SingleItem(props: SingleItemProps) {
  return (
    <div style={{ marginLeft: '0.25em', marginRight: '0.25em', display: 'inline' }}>
      <PokemonTypeDisplay type={props.type} /> <span style={{ verticalAlign: 'middle' }}>{props.value}</span>
    </div>
  );
}

export default function WeaknessResistance(props: WeaknessResistanceProps) {
  if (!props.weaknesses?.length && !props.resistances?.length) {
    return null;
  }
  return (
    <>
      <Divider textAlign="left"><Typography variant="cardHeading">Weakness/Resistance</Typography></Divider>
      <Box style={{ lineHeight: '1.5em' }}>
        {[...(props.weaknesses ?? []), ...(props.resistances ?? [])].map((it, idx) => (<SingleItem type={PokemonType.fromName(it.type)} value={it.value} key={idx} />))}
      </Box>
    </>
  );
}
