import React from 'react'
import { auth, provider } from "../../firebase";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Head from "next/head";

function LoginButton() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(console.error);
      };
    
      return (
        <Container>
          <Head>
            <title>Login</title>
          </Head>
          <LoginContainer>
            <Logo
              src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
              alt=""
            />
            <Button variant="outlined" onClick={signIn}>
              Sign in with Google
            </Button>
          </LoginContainer>
        </Container>
      )
}



export default LoginButton


const Container = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
