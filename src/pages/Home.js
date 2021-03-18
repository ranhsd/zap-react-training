import React from 'react';
import { Box, Container, Button } from '@material-ui/core';
import { navigate, Link } from 'raviger';



export default function Home(props) {

    const goToHome2 = () => {
        navigate('/home2');
    };

    return <Container>
        This is the original Home
        <Button color="primary" variant="contained" onClick={goToHome2}>Go to Home 2</Button>
        <Link href="/home2">Go to Home 2</Link>
    </Container>
};