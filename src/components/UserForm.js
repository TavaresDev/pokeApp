import { Button, Grid, Group, Paper, TextInput, Title } from '@mantine/core'
import React, { useContext, useEffect } from 'react'
import { useForm } from '@mantine/form';
import { UserContext } from '../context/UserContext'

//check if can use useLocalHook
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
        },
    });

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

    useEffect(() => {
        window.localStorage.setItem('user-form', JSON.stringify(form.values));
    }, [form.values]);

    return (
        <Paper shadow="md" size="md" radius="lg" p="lg" m='md' withBorder >

            <Title size='h2' fw='bold' c='red.7'> Please fill the form</Title>
            <form onSubmit={form.onSubmit((values) => {
                setUser({ ...user, values })
                nextStep()
                console.log('values')
                console.log(values)
            })}>
                <Grid gutter="xl">
                    <Grid.Col sm={6} lg={4} offsetLg={2}>
                        <TextInput label='First Name' my={'md'} {...form.getInputProps('firstName')} withAsterisk />
                        <TextInput label='Last Name' my={'md'} {...form.getInputProps('lastName')} withAsterisk />
                    </Grid.Col>
                    <Grid.Col sm={6} lg={4}>
                        <TextInput label='Address' my={'md'} {...form.getInputProps('address')} withAsterisk />
                        <TextInput label='Phone Number' my={'md'} {...form.getInputProps('phoneNumber')} withAsterisk />
                    </Grid.Col>
                </Grid>
                <Group position="center" mt="xl">
                    <Button bg='red' onClick={() => form.reset()}>Clear Form</Button>
                    <Button type="submit"> Save</Button>
                </Group>
            </form>
        </Paper>
    )
}
