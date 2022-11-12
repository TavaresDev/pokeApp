import { useContext, useState } from 'react';
import { Stepper, Button, Group, Container, Paper } from '@mantine/core';
import { Review } from './Review';
import { UserContext } from '../context/UserContext';
import { UserForm } from './UserForm';
import { SearchPokemon } from './SearchPokemon';

export const StepperProgress = () => {
    const [active, setActive] = useState(0);
    const { user, setUser } = useContext(UserContext);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const nextButtonText = (active === 2 ? 'Submit' : 'Next')
    const submissionMsg = (user.values !== undefined ? "Your submition was susccefull" : "try again")

    return (
        <Container>
            <Stepper active={active} onStepClick={setActive} color="red" breakpoint="xs" >
                <Stepper.Step label="Tell me about you" >

                    <UserForm nextStep={nextStep} />

                </Stepper.Step>
                <Stepper.Step label="Chose your favorite" >

                    <SearchPokemon nextStep={nextStep} />

                </Stepper.Step>
                <Stepper.Step label="Review" >

                    <Review />

                </Stepper.Step>
                <Stepper.Completed>

                    <Paper p='lg' >
                        {submissionMsg}
                    </Paper >

                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">

                {active &&
                    <Button variant="default" onClick={prevStep}>Back</Button>
                }

                {(active == 1 || active === 2) &&
                    <Button onClick={nextStep}>{nextButtonText}</Button>
                }
            </Group>
        </Container>
    )
}
