import { DialogActions } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import React from 'react';

export interface SetModalProps {
  set: PokemonTCG.Set;
  cardNumber: string;
}

function SetIcon(props: { set: PokemonTCG.Set }) {
  return (
    <img
      src={props.set.images.symbol}
      alt={props.set.name}
      title={props.set.name}
      width={25}
    />
  );
}

export default function SetModal(props: SetModalProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Box>
        <IconButton onClick={() => setVisible(true)}><SetIcon set={props.set} /></IconButton>
        {props.cardNumber}/{props.set.printedTotal}
      </Box>
      <Dialog
        onClose={() => setVisible(false)}
        open={visible}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>{props.set.name} <SetIcon set={props.set} /></DialogTitle>
        <DialogContentText paddingX={2}>
          <strong>Released</strong>: {props.set.releaseDate}
          <br />
          <strong>Series</strong>: {props.set.series}
          <br />
          <strong>Legality</strong>
          <br />
          <em>Standard</em>: {props.set.legalities.standard ?? '-'}
          <br />
          <em>Expanded</em>: {props.set.legalities.expanded ?? '-'}
          <br />
          <em>Unlimited</em>: {props.set.legalities.unlimited ?? '-'}
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={() => setVisible(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
