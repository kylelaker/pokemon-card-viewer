import colorless from './type-icons/colorless.png';
import darkness from './type-icons/darkness.png';
import dragon from './type-icons/dragon.png';
import fairy from './type-icons/fairy.png';
import fighting from './type-icons/fighting.png';
import fire from './type-icons/fire.png';
import grass from './type-icons/grass.png';
import lightning from './type-icons/lightning.png';
import metal from './type-icons/metal.png';
import psychic from './type-icons/psychic.png';
import water from './type-icons/water.png';
import React from 'react';

export class PokemonType {
  public static GRASS = new PokemonType('Grass', grass);
  public static FIRE = new PokemonType('Fire', fire);
  public static WATER = new PokemonType('Water', water);
  public static LIGHTNING = new PokemonType('Lightning', lightning);
  public static PSYCHIC = new PokemonType('Psychic', psychic);
  public static FIGHTING = new PokemonType('Fighting', fighting);
  public static DARKNESS = new PokemonType('Darkness', darkness);
  public static METAL = new PokemonType('Metal', metal);
  public static DRAGON = new PokemonType('Dragon', dragon);
  public static FAIRY = new PokemonType('Fairy', fairy);
  public static COLORLESS = new PokemonType('Colorless', colorless);
  private static readonly NO_TYPE = new PokemonType('', '', false);
  private constructor(public readonly name: string, public readonly icon: string, public readonly valid: boolean = true) { }

  public static fromName(name: string): PokemonType {
    switch (name.toLowerCase()) {
      case 'grass': return PokemonType.GRASS;
      case 'fire': return PokemonType.FIRE;
      case 'water': return PokemonType.WATER;
      case 'lightning': return PokemonType.LIGHTNING;
      case 'psychic': return PokemonType.PSYCHIC;
      case 'fighting': return PokemonType.FIGHTING;
      case 'darkness': return PokemonType.DARKNESS;
      case 'metal': return PokemonType.METAL;
      case 'dragon': return PokemonType.DRAGON;
      case 'fairy': return PokemonType.FAIRY;
      case 'colorless': return PokemonType.COLORLESS;
      // This type appears in some cases where an attack does not have a cost;
      // in that scenario, the cost should be displayed using the more common
      // representation (not displaying anything).
      case '[-]': return PokemonType.NO_TYPE;
      default:
        console.warn('Unexpected type ' + name);
        return new PokemonType(name, '', false);
    }
  }
}

export interface PokemonTypeProps {
  type: PokemonType;
  count?: number;
}

export default function PokemonTypeDisplay(props: PokemonTypeProps) {
  if (!props.type.valid) {
    return (<span>{props.type.name}</span>);
  }
  const img = (
    <img
      alt={props.type.name}
      title={props.type.name}
      src={props.type.icon}
      decoding="async"
      style={{ height: '1.5em', verticalAlign: 'middle', paddingRight: '2px' }}
    />
  );
  return (<>{[...Array(props.count || 1)].map((_, idx) => <React.Fragment key={idx}>{img}</React.Fragment>)}</>);
}
