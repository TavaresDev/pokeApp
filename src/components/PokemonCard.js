import { Paper, Image, AspectRatio, Center, Text } from '@mantine/core'
import React from 'react'
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #eee
  }
  ${({ active }) => active && `
    border:5px solid #FFCC00;
  `}

`;

export const PokemonCard = ({ id, name, image, selectPokemon, selected }) => {

    const activePokemon = (selected == id ? 1 : 0)
    return (
        <StyledPaper active={activePokemon} id={id} shadow="md" p="md" onClick={selectPokemon} withBorder>
            <>
                <Text order={2} size="h4">#{id}</Text>
                <AspectRatio ratio={3 / 4} sx={{ maxWidth: 140 }} mx="auto">

                    <Image
                        src={image}
                        height={160}
                        alt={name}
                    />
                </AspectRatio>
                <Text tt="capitalize" fw={700} order={1} size="h3"> {name}</Text >
                {/* true ?{selected}
                id = {id}
                sel = {selected}
                pok {selectedPok} pok */}
            </>
        </StyledPaper>
    )
}
