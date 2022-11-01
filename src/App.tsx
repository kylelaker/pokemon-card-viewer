import { Container } from "@cloudscape-design/components";
import Header from "@cloudscape-design/components/header";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import "@cloudscape-design/global-styles/index.css";
import './App.css';
import PokemonCards from './Cards';

function App() {
  return (
    <div>
      <TopNavigation
        identity={{
          href: "#",
          title: "Pokemon Cards"
        }}
        i18nStrings={{
          searchIconAriaLabel: "Search",
          searchDismissIconAriaLabel: "Close search",
          overflowMenuTriggerText: "More",
          overflowMenuTitleText: "All",
          overflowMenuBackIconAriaLabel: "Back",
          overflowMenuDismissIconAriaLabel: "Close menu"
        }}
      />
      <Header variant="h1">All Pokemon Cards</Header>
      <Container>
        <PokemonCards/>
      </Container>
    </div>
  );
}

export default App;
