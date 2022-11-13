import logo from '../img/pokemonLogo.svg';
import { AspectRatio, Container, Image, Space, Title, } from '@mantine/core';

export const Header = () => {
    return (
        <Container size="xs" px="xs" my="md">
            <AspectRatio ratio={5 / 2} sx={{ maxWidth: 400 }} mx="auto" mb='lg'>
                <Image
                    src={logo}
                    alt="Pokemon"
                />
            </AspectRatio>
            <Title c='white' fw='900'> Which is your favorite?</Title >
            <Space h="lg" />
        </Container>
    )
}
