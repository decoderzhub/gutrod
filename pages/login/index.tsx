import React, { useEffect } from "react";
import { auth, db, provider } from "../../firebase";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useRouter } from "next/router";

function login() {
  const router = useRouter();
  const signIn = () => {
    auth.signInWithPopup(provider).catch(console.error);
  };
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      router.push('/chatscreen')
    }
  }, [user]);

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
          Google Login
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
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
  height: 100px;
  width: 100px;
  margin-bottom: 50px;
`;
