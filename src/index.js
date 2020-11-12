import React, { useState } from 'react';
import ReactDOM from "react-dom";
import {
  ThemeProvider,
  DefaultTheme,
  StyleReset,
  Div,
  Row,
  Button,
  Icon,
  Modal,
  Input
} from "react-atomize";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    brand800: "#671de1"
  },
  rounded: {
    ...DefaultTheme.rounded,
    brandRadius: "20px"
  }
};

// Aligned Centered
const AlignCenterModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} align="center" rounded="md">
      <Icon
        name="Cross"
        pos="absolute"
        top="1rem"
        right="1rem"
        size="16px"
        onClick={onClose}
        cursor="pointer"
      />
      <Div d="flex" m={{ b: "4rem" }}>
        <Icon
          name="AlertSolid"
          color="warning700"
          m={{ t: "0.35rem", r: "0.5rem" }}
        />
        <Row>
          <Input
            placeholder="Pseudo"
            suffix={
              <Icon
                name="User"
                size="20px"
                cursor="pointer"
                onClick={() => console.log("clicked")}
                pos="absolute"
                top="50%"
                right="1rem"
                transform="translateY(-50%)"
              />
            }
          />
        </Row>
      </Div>
      <Div d="flex" justify="flex-end">
        <Button onClick={onClose} bg="info700">
          Go
        </Button>
      </Div>
    </Modal>
  );
};

const width = 500;
const height = 500;

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Div p="1rem" d="flex" flexDir="column">
        <StyleReset />

        <Div d="flex" m={{ b: "2rem" }}>
          <Div m={{ r: "1rem" }}>
          <AlignCenterModal
            isOpen={showModal}
            onClose={() => setShowModal( false )}
          />
          </Div>
        </Div>
      </Div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
