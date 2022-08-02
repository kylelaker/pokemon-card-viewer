import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

interface CardTypeProps {
  superType: PokemonTCG.Supertype;
  subTypes: PokemonTCG.Subtype[];
}

export default function CardType(props: CardTypeProps) {
  return (
    <>
      {props.superType.normalize()} {props.subTypes?.map(type => type.normalize()).join(' ')}
    </>
  );
}
