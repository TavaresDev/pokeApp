import { SimpleGrid, Space, TextInput, Container, Title, Loader } from '@mantine/core'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'
import { PokemonCard } from './PokemonCard'

export const SearchPokemon = ({ nextStep }) => {
    const [inputSearch, setInputSearch] = useState('')
    const { user, setUser } = useContext(UserContext)
    const URL = 'https://pokeapi.co/api/v2/pokemon'
    const pokemonLimit = '?limit=250'

    // custom hook to fetch and cache data
    const { status, data } = useFetch(URL, pokemonLimit)

    // if(status) console.log('status', status)
    // if(data) setPokemonList2(data=>data.results)
    console.log({ status })
    console.log({ data })

    // const fetchAllPokemon = async () => {
    //     const data = await get('pokemon', 'limit=10')
    //     // get each pokemon data
    //     data.results.forEach(async pokemon => {
    //         const pokemonData = await fetchPokemon(pokemon)
    //         setPokemonList(pokemonList => [...pokemonList, pokemonData])
    //     });
    // }

    // const fetchPokemon = async (pokemon) => {
    //     const data = await get(`pokemon/${pokemon.name}`)
    //     return data
    // }
    // const fetchPokemonById = async (pokemonID) => {
    //     const data = await get(`pokemon/${pokemonID}`)
    //     return data
    // }

    // const get = async (path, query) => {
    //     const url = baseURL + path + `${query ? '?' + query : ''}`
    //     const res = await fetch(url)
    //     const data = await res.json()
    //     return data
    // }

    // useEffect(() => {
    //     console.log(pokemonList.length)
    //     if (pokemonList.length === 0) {
    //         fetchAllPokemon()
    //         console.log(pokemonList)
    //     }

    // }, [])


    const selectPokemon = (e) => {
        const pokeId = e.currentTarget.id
        setUser({ ...user, pokeId })
        nextStep()
        // fetchPokemonById(pokeId).then((pokemonData) => setUser({...user,pokemonData}))

    }

    return (
        <Container shadow="md" radius="lg" mx='md' fluid  >
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
                        { minWidth: 'lg', cols: 4 },
                        { minWidth: 'xl', cols: 5 },
                    ]}>
                    {data?.results
                        .filter(pokemon => pokemon.name.includes(inputSearch))
                        .map((pokemon) => (
                            <PokemonCard key={pokemon.name}
                                selectPokemon={selectPokemon}
                                id={pokemon.name}
                                name={pokemon.name}
                            />

                        ))}
                </SimpleGrid>
            }
        </Container>
    )
}
