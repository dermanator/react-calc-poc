import './App.css';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { CalcFormNoFramework } from './CalcNoFormFramework/Index';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>Example 1 - No 3rd Party Form Framework, Local State With Reducers</Card.Header>
              <Card.Body>
                <CalcFormNoFramework />
              </Card.Body>
            </Card>
          </Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </div> 
  );
}

export default App;
