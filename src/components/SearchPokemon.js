import { Paper, SimpleGrid, Space, TextInput, Container } from '@mantine/core'
import { useEffect, useState } from 'react'
import { PokemonCard } from './PokemonCard'

export const SearchPokemon = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [selectedPokemon, setSelectedPokemon] = useState(1)
    const baseURL = 'https://pokeapi.co/api/v2/'
    const path = '?limit='

    const fetchAllPokemon = async () => {
        const data = await get('pokemon', 'limit=20')
        // get each pokemon data
        data.results.forEach(async pokemon => {
            const pokemonData = await fetchPokemon(pokemon)
            setPokemonList(pokemonList => [...pokemonList, pokemonData])
        });
    }

    const fetchPokemon = async (pokemon) => {
        const data = await get(`pokemon/${pokemon.name}`)
        return data
    }
    const fetchPokemonById = async (pokemonID) => {
        const data = await get(`pokemon/${pokemonID}`)
        return data
    }

    const get = async (path, query) => {
        const url = baseURL + path + `${query ? '?' + query : ''}`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        console.log(pokemonList.length)
        if (pokemonList.length == 0) {
            fetchAllPokemon()
            console.log(pokemonList)
        }

    }, [])


    const selectPokemon = (e) => {
        console.log('e.currentTarget')
        console.log(e.currentTarget)
        setSelectedPokemon(e.currentTarget.id)
        // fetchPokemonById(pokemonId).then((data) => setSelectedPokemon(data.id))

    }

    return (
        <Container shadow="md" radius="lg" mx='md' fluid  >
            <h2>SearchPokemon</h2>
            <Container align='left'>


                <TextInput align="left" size='md' label='Search Pokemon Name'
                    value={inputSearch} onChange={(e) => setInputSearch(e.currentTarget.value)} />
                <Space h="xl" />
            </Container>

            <SimpleGrid
                breakpoints={[
                    { minWidth: 'xs', cols: 2 },
                    { minWidth: 'sm', cols: 3 },
                    { minWidth: 'md', cols: 4 },
                    { minWidth: 'lg', cols: 4 },
                    { minWidth: 'xl', cols: 5 },
                ]}>
                {pokemonList
                    .filter(pokemon => pokemon.name.includes(inputSearch))
                    .map((pokemon) => (
                        <PokemonCard key={pokemon.id}
                            selectPokemon={selectPokemon}
                            selected={selectedPokemon}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.sprites.front_default}
                        />

                    ))}
            </SimpleGrid>
        </Container>
    )
}
