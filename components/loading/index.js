import { Circle } from "better-react-spinkit";
import styled from "styled-components";

function Loading() {
  return (
    // <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <LoadingContainer>
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#3CBC28" size={60} />
      </LoadingContainer>
    // </center>
  );
}

export default Loading;


const LoadingContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);
`;