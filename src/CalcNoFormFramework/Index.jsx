
import { Form, Table, Button, Container, Col, Row, FormControl } from 'react-bootstrap';
import React, { useCallback, useReducer, useState } from 'react';
import { InputField, TotalField } from './Fields';
import { reducer, initialData } from './calculations';

export const CalcFormNoFramework = () => {
  const [data, dispatch] = useReducer(reducer, initialData);
  const [submitData, setSubmitData] = useState(null);

  const handleAddItem = useCallback(() => {
    dispatch({ type: "ITEM_ADD", numItems: 10 });
  }, []);

  const handleReset = () => {
    setSubmitData(null);
    dispatch({ type: "RESET" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitData(data);
  };

  return (
    <Form>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Extended Price</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length < 1 && <tr><td colSpan="4">No Items</td></tr>}
                {data.items.length > 0 && data.items.map((item, i) => (
                  <tr key={item.itemId}>
                    <td>
                      <InputField itemId={item.itemId} name={`itemName`} value={item.itemName} dispatch={dispatch} />
                    </td>
                    <td>
                      <InputField itemId={item.itemId} name={`quantity`} value={item.quantity} dispatch={dispatch} />
                    </td>
                    <td>
                      <InputField itemId={item.itemId} name={`unitPrice`} value={item.unitPrice} dispatch={dispatch} />
                    </td>
                    <td>
                      <InputField itemId={item.itemId} name={`extendedPrice`} value={item.extendedPrice} readOnly />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </Col>
          <Col md="auto">
            <Container className="p-0">
              {/* Total Items */}
              <Row className="mb-1">
                <Col md={{ span: 4 }} className="text-end">
                  <Form.Label column>Total Items:</Form.Label>
                </Col>
                <Col md={{ span: 8 }}>
                  <FormControl className="text-end" name="totalItems" value={data.items.length} readOnly />
                </Col>
              </Row>

              {/* Sub Total */}
              <Row className="mb-1">
                <Col md={{ span: 4 }} className="text-end">
                  <Form.Label column>Sub Total:</Form.Label>
                </Col>
                <Col md={{ span: 8 }}>
                  <TotalField name="subTotal" value={data.subTotal} readOnly />
                </Col>
              </Row>

              {/* Taxes */}
              <Row className="mb-1">
                <Col md={{ span: 4 }} className="text-end">
                  <Form.Label column>Taxes:</Form.Label>
                </Col>
                <Col md={{ span: 8 }}>
                  <TotalField name="taxes" value={data.taxes} dispatch={dispatch} />
                </Col>
              </Row>

              {/* Shipping */}
              <Row className="mb-1">
                <Col md={{ span: 4 }} className="text-end">
                  <Form.Label column>Shipping:</Form.Label>
                </Col>
                <Col md={{ span: 8 }}>
                  <TotalField name="shipping" value={data.shipping} dispatch={dispatch} />
                </Col>
              </Row>

              {/* Total */}
              <Row className="mb-1">
                <Col md={{ span: 4 }} className="text-end">
                  <Form.Label column>Total:</Form.Label>
                </Col>
                <Col md={{ span: 8 }}>
                  <TotalField name="total" value={data.total} readOnly />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col className="m-1 p-0">
                  <Button variant="info" className="w-100" onClick={handleAddItem}>Add Items</Button>
                </Col>
                <Col className="m-1 p-0">
                  <Button variant="secondary" className="w-100" onClick={handleReset}>Reset</Button>
                </Col>
                <Col className="m-1 p-0">
                  <Button type="submit" variant="primary" className="w-100" onClick={handleSubmit}>Submit</Button>
                </Col>
              </Row>
              {submitData && (<Row className="mb-3">
                <Col>
                  <textarea className='w-100' style={{height: "500px"}} value={JSON.stringify(submitData, null, 2)} />
                </Col>
              </Row>)}
            </Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};


