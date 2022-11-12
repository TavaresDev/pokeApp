import { Paper, Image, AspectRatio, Text, Loader } from '@mantine/core'
import styled from '@emotion/styled';
import { useFetch } from '../hooks/useFetch';

const StyledPaper = styled(Paper)`
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
	outline: 5px solid #FFCC00;
  }

`;

export const PokemonCard = ({ name, selectPokemon }) => {

	const pokeURL = `https://pokeapi.co/api/v2/pokemon/${name}`
	const { status, data: pokemonData } = useFetch(name && pokeURL)


	if (status !== 'fetched') return (
		<StyledPaper shadow="md" p="md" withBorder>
			<Loader variant="dots" />
		</StyledPaper>
	)

	return (
		<StyledPaper id={name} shadow="md" p="md" onClick={selectPokemon} withBorder>
			<Text order={2} fw='bold' size="h4">#  {pokemonData?.id}</Text>
			<AspectRatio ratio={3 / 4} sx={{ maxWidth: 140 }} mx="auto">
				<Image
					src={pokemonData?.sprites.front_default}
					height={160}
					alt={pokemonData?.name}
				/>
			</AspectRatio>
			<Text tt="capitalize" fw={700} order={1} size="h3"> {pokemonData?.name}</Text >
		</StyledPaper>
	)
}
