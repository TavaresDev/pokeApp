import { Button, Grid, Group, Paper, TextInput, Title } from '@mantine/core'
import React, { useContext, useEffect } from 'react'
import { useForm } from '@mantine/form';
import { UserContext } from '../context/UserContext'

export const UserForm = ({ nextStep }) => {
    const { user, setUser } = useContext(UserContext);
    const validatePhoneNumber = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
        },
        validate: {
            phoneNumber: (value) => (validatePhoneNumber.test(value) ? null : 'Invalid Phone Number'),
            firstName: (value) => (value.length < 2 ? 'First name is required' : null),
            lastName: (value) => (value.length < 2 ? 'Last name is required' : null),
            address: (value) => (value.length < 8 ? 'Address name is required' : null),
        },
    });


    // On mount, try to get data from localStorage and set to form
    useEffect(() => {
        const storedValue = window.localStorage.getItem('user-form');
        if (storedValue) {
            try {
                form.setValues(JSON.parse(window.localStorage.getItem('user-form')));
            } catch (e) {
                console.log('Failed to parse stored value');
            }
        }
    }, []);

    //Store data to local storage on Form change
    useEffect(() => {
        window.localStorage.setItem('user-form', JSON.stringify(form.values));
    }, [form.values]);

    // clean form and Local storage
    const cleanAllData = () =>{
        form.reset()
        window.localStorage.clear()
        setUser(null)
    }

    return (
        <Paper shadow="md" size="md" radius="lg" p="lg" my='md' withBorder >

            <Title size='h2' fw='bold' c='red.7' mb='md'> Please fill the form</Title>
            <form onSubmit={form.onSubmit((values) => {
                setUser({ ...user, values })
                nextStep()
            })}>
                <Grid gutter="md" >
                    <Grid.Col sm={6} lg={4} offsetLg={2}  py='0'>
                        <TextInput label='First Name' my={'md'} {...form.getInputProps('firstName')} withAsterisk />
                        <TextInput label='Last Name' mt={'md'} {...form.getInputProps('lastName')} withAsterisk />
                    </Grid.Col>
                    <Grid.Col sm={6} lg={4} py='0'>
                        <TextInput label='Address' my={'md'} {...form.getInputProps('address')} withAsterisk />
                        <TextInput label='Phone Number' my={'md'} {...form.getInputProps('phoneNumber')} withAsterisk />
                    </Grid.Col>
                </Grid>
                <Group position="center" mt="xl">
                    <Button bg='red' onClick={cleanAllData}>Clear Form</Button>
                    <Button type="submit"> Save</Button>
                </Group>
            </form>
        </Paper>
    )
}
