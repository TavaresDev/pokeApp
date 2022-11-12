
import './App.css';
import { Header } from './components/Header';
import { Container } from '@mantine/core';
import styled from '@emotion/styled';
import { StepperProgress } from './components/StepperProgress';
import { UserContext } from './context/UserContext';
import { useState } from 'react';

const AppContainer = styled(Container)`
  text-align: center;
  background: #61dafb;
`;

function App() {
  const [user, setUser] = useState({})
  return (
    <UserContext.Provider value={{ user, setUser }}>

      <AppContainer size='xl' p='lg'>

        <Header />
          {/* // All components are inside Stepper */}
        <StepperProgress />

      </AppContainer>
    </UserContext.Provider>
  );
}

export default App;
