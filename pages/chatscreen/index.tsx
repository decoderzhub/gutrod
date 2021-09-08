import Head from "next/head";
import styled from "styled-components";
import Users from "@/components/users";
import React from "react";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Your Chats</title>
      </Head>
      <Users/>
    </Container>
  );
}

const Container = styled.div``;
