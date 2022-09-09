import styled from "styled-components";

const Wapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 90vw;
`;

const Home = () => {
  return (
    <div>
      <Wapper>whow</Wapper>
    </div>
  );
};

export default Home;
