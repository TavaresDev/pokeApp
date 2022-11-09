import logo from './pokemonLogo.svg';
import { AspectRatio, Container, Image, Space, } from '@mantine/core';
import './App.css';
import { UserForm } from './components/UserForm';

function App() {
  return (
    <div className="">
      {/* make blue light bg  */}

      {/* //Header */}
      <Container size="xs" px="xs" my="md">
        {/* //center text */}
        <h1> Who is your favorite</h1>
        <AspectRatio ratio={5 / 2} sx={{ maxWidth: 400 }} mx="auto">
          <Image
            src={logo}
            alt="Pokemon"
          />
        </AspectRatio>

        <Space h="lg" />
      </Container>
      {/*  Form*/}
      <>

        <UserForm />



      </>
    </div>
  );
}

export default App;
