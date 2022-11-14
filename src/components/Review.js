import {
  Container,
  Paper,
  Title,
  Text,
  SimpleGrid,
  Group,
  Stack,
} from "@mantine/core"
import React, { useContext } from "react"
import { PokemonCard } from "./PokemonCard"
import { UserContext } from "../context/UserContext"

export const Review = () => {
  const { user } = useContext(UserContext)

  return (
    <Container>
      <Title c='white' mb='md'>
        Confirm your data
      </Title>
      <SimpleGrid breakpoints={[{ minWidth: "xs", cols: 2 }]}>
        <Paper p='xl'>
          <Stack justify='space-around'>
            <Group position='center' spacing='lg'>
              <Text fw='bold'> First name : </Text>
              <Text>{user?.values?.firstName} </Text>
            </Group>
            <Group position='center' spacing='lg'>
              <Text fw='bold'> Last name :</Text>
              <Text>{user?.values?.lastName} </Text>
            </Group>
            <Group position='center' spacing='lg'>
              <Text fw='bold'> Phone number: </Text>
              <Text>{user?.values?.phoneNumber} </Text>
            </Group>
            <Group position='center' spacing='lg'>
              <Text fw='bold'> Address: </Text>
              <Text>{user?.values?.address} </Text>
            </Group>
          </Stack>
        </Paper>
        <PokemonCard name={user?.pokeId} />
      </SimpleGrid>
    </Container>
  )
}
