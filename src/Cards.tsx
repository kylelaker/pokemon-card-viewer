import SettingsIcon from '@mui/icons-material/Settings';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { useEffect, useState } from 'react';
import Ability from './Ability';
import Attacks from './Attacks';
import CardType from './CardType';
import SetModal from './SetModal';
import WeaknessResistance from './WeaknessResistance';

export function PokemonCard(props: { card: PokemonTCG.Card }) {
  const { card } = props;
  return (
    <>
      <CardHeader title={card.name} subheader={<CardType superType={card.supertype} subTypes={card.subtypes} />} />
      <CardContent>
        <Stack spacing={2}>
          {card.flavorText && <><Typography style={{ fontStyle: 'italic' }}>{card.flavorText}</Typography></>}
          {card.abilities?.length && (<><Divider textAlign="left"><Typography variant="cardHeading">Abilities</Typography></Divider><Stack>{card.abilities?.map(ability => <Ability key={ability.name} ability={ability} />)}</Stack></>)}
          {card.attacks?.length && (<><Divider textAlign="left"><Typography variant="cardHeading">Attacks</Typography></Divider><Attacks attacks={card.attacks} /></>)}
          {card.rules?.length && <><Divider textAlign="left"><Typography variant="cardHeading">Rules</Typography></Divider><Box>{card.rules?.map(rule => <Typography key={rule}>{rule}</Typography>)}</Box></>}
          <WeaknessResistance weaknesses={card.weaknesses} resistances={card.resistances} />
          <Divider />
          <Stack direction="row" alignItems="center" spacing={2}>
            <SetModal set={card.set} cardNumber={card.number} />
            <Typography>{card.rarity}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </>
  );
}

export function SkeletonCard() {
  return (
    <>
      <CardHeader title={<Skeleton />} subheader={<Skeleton />} />
      <CardContent>
        <Stack spacing={2}>
          {/* Card Description */}
          <Skeleton variant="rounded" height={80} />
          {/* Abilities */}
          <Divider textAlign="left"><Skeleton width="5em" /></Divider>
          <Skeleton variant="rounded" height={40} />
          {/* Attacks */}
          <Divider textAlign="left"><Skeleton width="5em" /></Divider>
          <Skeleton variant="rounded" height={80} />
          {/* Rules */}
          <Divider textAlign="left"><Skeleton width="5em" /></Divider>
          <Skeleton variant="rounded" height={40} />
          {/* Weakness/Resistance */}
          <Divider textAlign="left"><Skeleton width="10em" /></Divider>
          <Skeleton />
          {/* Set & Rarity */}
          <Divider />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Skeleton width="2em" />
            <Skeleton width="5em" />
          </Stack>
        </Stack>
      </CardContent>
    </>
  );
}

interface Preferences {
  pageSize: 9 | 30;
  orderBy: string;
}

interface SettingsModalProps {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
}

interface PaginationAndFilterProps extends SettingsModalProps {
  page: number;
  count: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  filter: string;
  onFilterChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function Settings(props: SettingsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  // The values of the Preferences are cached until the Save button is clicked
  // to allow for cancelation and over-eagerly making API calls
  const [pageSize, setPageSize] = useState(props.preferences.pageSize);
  const [orderBy, setOrderBy] = useState(props.preferences.orderBy);
  const handleAbort = () => { setIsOpen(false); };
  const handleOpen = () => { setIsOpen(true); };
  const handleSave = () => {
    props.setPreferences({
      pageSize,
      orderBy
    });
    setIsOpen(false);
  };
  const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    switch (event.target.value) {
      case "9": setPageSize(9); break;
      case "30": setPageSize(30); break;
      default: return;
    }
  };
  const onOrderByChange = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setOrderBy(event.target.value);
  };
  return (
    <>
      <IconButton onClick={handleOpen}><SettingsIcon /></IconButton>
      <Dialog open={isOpen} onClose={handleAbort} maxWidth="sm" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>
              Control the number of items returned on each page and how they&rsquo;re sorted.
            </DialogContentText>
            <FormControl>
              <FormLabel>Page Size</FormLabel>
              <RadioGroup value={pageSize} onChange={onPageSizeChange} row>
                <FormControlLabel value="9" control={<Radio />} label="9 cards" />
                <FormControlLabel value="30" control={<Radio />} label="30 cards" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Sort order</FormLabel>
              <TextField onChange={onOrderByChange} value={orderBy} />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAbort}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function PaginationAndFilter(props: PaginationAndFilterProps) {
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid xs={12} md={9}>
        <TextField fullWidth label="Filter" variant="outlined" value={props.filter} onChange={props.onFilterChange} />
      </Grid>
      <Grid xs={10} md={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Pagination page={props.page} count={props.count} onChange={props.onPageChange} />
          <Settings preferences={props.preferences} setPreferences={props.setPreferences} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default function CardsV2() {
  const [cardList, setCardList] = useState([] as PokemonTCG.Card[]);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    pageSize: 9,
    orderBy: 'set.releaseDate,set.id,number',
  } as Preferences);
  const [filteringText, setFilteringText] = useState('');
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
      orderBy: preferences.orderBy,
      q: filteringText
    }).then((result) => {
      setCardList(result);
      setIsLoading(false);
    }).catch((err) => {
      setError(err);
      setIsLoading(false);
      setCardList([]);
    });
  }, [currentPageIndex, preferences, filteringText]);

  useEffect(() => {
    if (currentPageIndex >= maxPageNumber && cardList.length >= 0) {
      setMaxPageNumber(currentPageIndex + 1);
    }
  }, [currentPageIndex, maxPageNumber, cardList]);

  const nextPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageIndex(value);
    if (value >= maxPageNumber && cardList.length >= 0) {
      setMaxPageNumber(value + 1);
    }
  };
  const setFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFilteringText(event.target.value);
    setMaxPageNumber(1);
    setCurrentPageIndex(1);
  };

  const data = !isLoading ? cardList : [...Array(preferences.pageSize)];
  const contents = (card?: PokemonTCG.Card) => (card == null) ? <SkeletonCard /> : <PokemonCard card={card} />;

  return (
    <Stack spacing={2}>
      <PaginationAndFilter
        page={currentPageIndex}
        count={maxPageNumber}
        onPageChange={nextPage}
        filter={filteringText}
        onFilterChange={setFilter}
        preferences={preferences}
        setPreferences={setPreferences} />
      {(error != null) && <Alert severity="error"><AlertTitle>Error</AlertTitle>{error.message}</Alert>}
      <Grid container alignItems="stretch">
        {data.map((card, idx) => (
          <Grid lg={4} xs={12} component={MuiCard} variant="outlined" key={idx}>
            {contents(card)}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
