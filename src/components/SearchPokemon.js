import { SimpleGrid, Space, TextInput, Container, Title, Loader } from '@mantine/core'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'
import { PokemonCard } from './PokemonCard'

export const SearchPokemon = ({ nextStep }) => {
    const [inputSearch, setInputSearch] = useState('')
    const { user, setUser } = useContext(UserContext)
    const baseURL = 'https://pokeapi.co/api/v2/pokemon'
    const pokemonLimit = '?limit=250'

    let URL = baseURL + pokemonLimit

    // custom hook to fetch and cache data
    const { status, data } = useFetch(URL)

    const selectPokemon = (e) => { 
        const pokeId = e.currentTarget.id
        setUser({ ...user, pokeId })
        nextStep()
    }

    return (
        <Container shadow="md" radius="lg" fluid  >
            <Title c='white' >Filter and select</Title >
            <Container my='md'>
                <TextInput align="left" size='md' aria-label='Search Pokemon Name' placeholder='Search by name'
                    value={inputSearch} onChange={(e) => setInputSearch(e.currentTarget.value.toLocaleLowerCase())} />
                <Space h="xl" />
            </Container>
            {status !== 'fetched' ? <Loader variant="dots" /> :
                <SimpleGrid
                    breakpoints={[
                        { minWidth: 'xs', cols: 2 },
                        { minWidth: 'sm', cols: 3 },
                        { minWidth: 'md', cols: 4 },
                        { minWidth: 'lg', cols: 5 },
                        { minWidth: 'xl', cols: 6 },
                    ]}>
                    {data?.results
                        .filter(pokemon => pokemon.name.includes(inputSearch))
                        .map((pokemon) => (
                            <PokemonCard key={pokemon.name}
                                selectPokemon={selectPokemon}
                                id={pokemon.name}
                                name={pokemon.name}
                                selected={user?.pokeId}
                            />
                        ))}
                </SimpleGrid>
            }
        </Container>
    )
}
