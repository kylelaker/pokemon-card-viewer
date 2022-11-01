import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Alert, Box, CollectionPreferences, Pagination, Table, TextContent, TextFilter } from "@cloudscape-design/components";
import { useCollection } from '@cloudscape-design/collection-hooks';
import PokemonType, { nameToType } from "./PokemonType";

function EmptyState() {
  return (
    <Box>Uhh this shouldn't happen</Box>
  );
}

export default function CardAttacks(props: {attacks: PokemonTCG.Attack[]}) {
  const attackCost = (attack: PokemonTCG.Attack)  => (
    <>
      {attack.cost.map((cost) => <PokemonType typeName={nameToType(cost)} />)}
    </>
  );

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    props.attacks,
    {
      sorting: {}
    }
  );

  return (<Table
    {...collectionProps}
    items={items}
    trackBy="name"
    columnDefinitions={[
      {
        id: "cost",
        header: "Attack Cost",
        cell: attack => attackCost(attack),
        sortingComparator: (a, b) => a.cost.length - b.cost.length,
      },
      {
        id: "name",
        header: "Name",
        cell: attack => attack.name,
        sortingField: "name"
      },
      {
        id: "text",
        header: "Description",
        cell: attack => attack.text,
      },
      {
        id: "damage",
        header: "Damage",
        cell: attack => attack.damage,
        sortingField: "damage"
      }
    ]}
    wrapLines
  />);
}
