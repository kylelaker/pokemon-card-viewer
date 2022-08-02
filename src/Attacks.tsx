import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import PokemonTypeDisplay, { PokemonType } from './PokemonType';

function Attack(props: { attack: PokemonTCG.Attack }) {
  return (
    <Grid container rowSpacing={1} columnSpacing={0} xs={12} margin={0} padding={0}>
      <Grid xs={4}>
        <Typography>
          {props.attack.cost.map((cost, idx) => <PokemonTypeDisplay type={PokemonType.fromName(cost)} key={idx} />)}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="cardHeading">{props.attack.name}</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="cardHeading">{props.attack.damage}</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>{props.attack.text}</Typography>
      </Grid>
    </Grid>
  );
}

export default function CardAttacks(props: { attacks: PokemonTCG.Attack[] }) {
  return (
    <Stack>
      {props.attacks.map((attack) => <Attack attack={attack} key={attack.name} />)}
    </Stack>
  );
}
