
import './App.css';
import { UserForm } from './components/UserForm';
import { SearchPokemon } from './components/SearchPokemon';
import { Header } from './components/Header';
import { Container } from '@mantine/core';
import styled from '@emotion/styled';

const AppContainer = styled(Container)`
  text-align: center;

  background: #61dafb;

`;

function App() {
  return (
    <AppContainer size='xl' p='lg'>
      {/* make blue light bg  */}

      <Header />

      <UserForm />

      <SearchPokemon />

    </AppContainer>
  );
}

export default App;
