import PokemonType, { nameToType } from "./PokemonType";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface WeaknessResistanceProps {
  weaknesses?: PokemonTCG.Weakness[];
  resistances?: PokemonTCG.Resistance[];
}

interface SingleItemProps {
  typeName: string;
  value: string;
}

function SingleItem(props: SingleItemProps) {
  return (
    <div style={{marginLeft: "0.25em", marginRight: "0.25em", display: "inline"}}>
      <PokemonType typeName={nameToType(props.typeName)} /> <span style={{verticalAlign: "middle"}}>{props.value}</span>
    </div>
  );
}

export default function WeaknessResistance(props: WeaknessResistanceProps) {
  return (
    <div style={{ lineHeight: "1.5em" }}>
      <>
        {[...(props.weaknesses ?? []), ...(props.resistances ?? [])].map((it) => (<SingleItem typeName={nameToType(it.type)} value={it.value} />))}
      </>
    </div>
  );
}
