import colorless from "./type-icons/colorless.png";
import grass from "./type-icons/grass.png";
import fire from "./type-icons/fire.png";
import water from "./type-icons/water.png";
import lightning from "./type-icons/lightning.png";
import psychic from "./type-icons/psychic.png";
import fighting from "./type-icons/fighting.png";
import darkness from "./type-icons/darkness.png";
import metal from "./type-icons/metal.png";
import dragon from "./type-icons/dragon.png";
import fairy from "./type-icons/fairy.png";

export enum PokemonTypeName {
  GRASS = "Grass",
  FIRE = "Fire",
  WATER = "Water",
  LIGHTNING = "Lightning",
  PSYCHIC = "Psychic",
  FIGHTING = "Fighting",
  DARK = "Darkness",
  METAL = "Metal",
  DRAGON = "Dragon",
  FAIRY = "Fairy",
  COLORLESS = "Colorless",
}

function icon(type: PokemonTypeName): string {
  switch (type) {
    case PokemonTypeName.GRASS: return grass;
    case PokemonTypeName.FIRE: return fire;
    case PokemonTypeName.WATER: return water;
    case PokemonTypeName.LIGHTNING: return lightning;
    case PokemonTypeName.PSYCHIC: return psychic;
    case PokemonTypeName.FIGHTING: return fighting;
    case PokemonTypeName.DARK: return darkness;
    case PokemonTypeName.METAL: return metal;
    case PokemonTypeName.DRAGON: return dragon;
    case PokemonTypeName.FAIRY: return fairy;
    case PokemonTypeName.COLORLESS: return colorless;
    default: return type;
  }
}

export interface PokemonTypeProps {
  typeName: PokemonTypeName;
  count?: number;
}

export default function PokemonTypeDisplay(props: PokemonTypeProps) {
  const img = (
    <img
      alt={props.typeName}
      title={props.typeName}
      src={icon(props.typeName)}
      decoding="async"
      style={{height: "1.5em", verticalAlign: "middle"}}
    />
  );
  return (<>{[...Array(props.count || 1)].map(() => img)}</>);
}

export function nameToType(enumValue: string): PokemonTypeName {
  switch (enumValue.toLowerCase()) {
    case "grass": return PokemonTypeName.GRASS;
    case "fire": return PokemonTypeName.FIRE;
    case "water": return PokemonTypeName.WATER;
    case "lightning": return PokemonTypeName.LIGHTNING;
    case "psychic": return PokemonTypeName.PSYCHIC;
    case "fighting": return PokemonTypeName.FIGHTING;
    case "darkness": return PokemonTypeName.DARK;
    case "metal": return PokemonTypeName.METAL;
    case "dragon": return PokemonTypeName.DRAGON;
    case "fairy": return PokemonTypeName.FAIRY;
    case "colorless": return PokemonTypeName.COLORLESS;
    default: throw new Error(`Unknown type: ${enumValue}`);
  }
}
