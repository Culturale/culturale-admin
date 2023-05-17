import {
    Box,
    Typography,
    Container,
    styled
} from '@mui/material'
import React from 'react';

import LoginJWT from './LoginJWT'
import { useEffect } from 'react';


const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    `
);

const TopWrapper = styled(Box)(
    () => `
    display:flex;
    width: 100%;
    flex: 1;
    padding: 20px;
    ` 
);

function LoginBasic() {

return (
    <>
        <title>Login</title>
        <MainContent>
            <TopWrapper>
                <Container>
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{mb: 
                                1
                            }}
                            >
                            Identificación
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mb: 3
                            }}

                        >
                            Llena los espacios para empezar
                        </Typography>
                    </Box>
                    {<LoginJWT />}
                </Container>
            </TopWrapper>
        </MainContent>
    </>
);
                      
}

export default LoginBasic;
