import { Container } from "../../components/Container";
import Nav from "../../components/Nav";
import { MainCards } from "../../components/MainCards";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";
import { EditTransaction } from "../../components/EditTransaction";

export function Home() {
  const { screen } = useContext(ViewContext);

  return (
    <>
      <Nav />
      <Container>
        {screen === "main" && <MainCards />}
        {(screen === "receipt" ||
          screen === "expense" ||
          screen === "balance" ||
          screen === "card") && <EditTransaction type={screen} />}
      </Container>
    </>
  );
}
