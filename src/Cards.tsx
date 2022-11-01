import { Alert, Badge, Box, CollectionPreferences, Pagination, Table, TextContent, TextFilter } from "@cloudscape-design/components";
import Cards from "@cloudscape-design/components/cards";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useState, useEffect } from "react";
import Attacks from "./Attacks";
import CardType from "./CardType";
import SetModal from "./SetModal";
import PokemonType, { nameToType } from "./PokemonType";
import WeaknessResistance from "./WeaknessResistance";

export default function PokemonCards(props: unknown) {
  const [cardList, setCardList] = useState([] as PokemonTCG.Card[]);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    pageSize: 9,
  });
  const [filteringText, setFilteringText] = useState("");
  const [
    currentPageIndex,
    setCurrentPageIndex
  ] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    PokemonTCG.findCardsByQueries({
      pageSize: preferences.pageSize,
      page: currentPageIndex,
      orderBy: "set.releaseDate,number",
      q: filteringText,
    }).then((result) => {
      setCardList(result);
      setIsLoading(false);
    }).catch((err) => {
      setError(err);
      setIsLoading(false);
      setCardList([]);
    });
  }, [currentPageIndex, preferences, filteringText]);

  const empty = (
    <Box textAlign="center">
      <b>No Cards</b>
      <Box
        padding={{ bottom: "s" }}
        variant="p"
      >
        No cards to display
      </Box>
    </Box>
  );

  return (
    <>
      <Alert
        visible={!!error}
        type="error"
        header="An error occurred"
      >
        An unexpected error occurred when loading the cards data. ({error?.message})
      </Alert>
      <Cards
        cardDefinition={{
          header: card => card.name,
          sections: [
            {
              id: "hp",
              content: card => (<Badge color="red">{card.hp} HP</Badge>),
            },
            {
              id: "card-type",
              header: "Card Type",
              content: card => <CardType superType={card.supertype} subTypes={card.subtypes} />
            },
            {
              id: "type",
              header: "Type",
              content: card => card.types?.map(type => (<PokemonType typeName={nameToType(type.normalize())} />)),
            },
            {
              id: "description",
              header: "Description",
              content: card => card.flavorText,
            },
            {
              id: "rules",
              header: "Rules",
              content: card => (card.rules?.map(rule => <p>{rule}</p>)),
            },
            {
              id: "ability",
              header: "Ability",
              content: card => card.abilities?.map(ability => (
                <p><strong>{ability.name}</strong> {ability.text}</p>
              )),
            },
            {
              id: "attacks",
              header: "Attacks",
              content: card => (
                card.attacks?.length && (<Attacks attacks={card.attacks} />)
              ),
            },
            {
              id: "weakness-resistance",
              header: "Weakness / Resistance",
              content: card => (<WeaknessResistance weaknesses={card.weaknesses}resistances={card.resistances} />),
            },
            {
              id: "set-id",
              header: "ID",
              content: card => {
                return (<SetModal set={card.set} cardNumber={card.number} />)
              },
            },
          ],
        }}
        cardsPerRow={[{ cards: 3 }]}
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={({ detail }) => {
              const pageIdx = detail.currentPageIndex;
              setCurrentPageIndex(pageIdx);
              if (pageIdx > maxPageNumber && cardList.length > 0) {
                setMaxPageNumber(pageIdx);
              }
            }}
            openEnd={!isLoading && cardList.length >= preferences.pageSize}
            pagesCount={maxPageNumber}
          />
        }
        empty={!error && empty}
        items={cardList}
        loading={isLoading}
        loadingText="Loading cards"
        trackBy={(card) => card.id}
        filter={
          <TextFilter
            filteringText={filteringText}
            filteringPlaceholder="Find cards"
            filteringAriaLabel="Filter cards"
            onChange={({ detail }) => {
              setFilteringText(detail.filteringText);
              setMaxPageNumber(1);
              setCurrentPageIndex(1);
            }}
          />
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            onConfirm={({ detail }) => setPreferences({
              pageSize: detail.pageSize ?? 9,
            })}
            preferences={{ pageSize: preferences.pageSize }}
            pageSizePreference={{
              title: "Select page size",
              options: [
                { value: 9, label: "9 cards" },
                { value: 30, label: "30 cards" },
              ]
            }}
          />
        }
      />
    </>
  );
}
