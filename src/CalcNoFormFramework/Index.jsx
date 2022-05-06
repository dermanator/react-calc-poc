
import { Form, Table, Button, Container, Col, Row } from 'react-bootstrap';
import React, { useState, useCallback } from 'react';
import { set } from 'lodash';
import { InputField, TotalField } from './Fields';

export const CalcFormNoFramework = () => {
  const [data, setData] = useState({ items: [], subTotal: 0, taxes: 0, shipping: 0, total: 0 });

  //  Could probably use a second set of eyes to see if it could be done cleaner
  const createNewDataFromOld = (oldData, event) => {
    // set(oldData, event.target.name, event.target.value);
    // return {...oldData};

    const newData = { ...oldData, items: oldData.items.map(item => ({ ...item })) };

    //  Update the new value
    set(newData, event.target.name, event.target.value);

    //  Calculate extended price for each item
    newData.items = newData.items.map(item => ({ ...item, extendedPrice: Number(item.quantity) * Number(item.unitPrice) }));

    //  Calculate sub total
    newData.subTotal = newData.items.reduce((total, item) => total + item.extendedPrice, 0);

    //  Calculate total
    newData.total = Number(newData.subTotal) + Number(newData.taxes) + Number(newData.shipping);
    return newData;
  }

  //  I don't think either one of these does much to reduce re-renders.  I think I need to use the useReducerHook instead.
  const handleDataChange = useCallback(event => {
    setData(oldData => createNewDataFromOld(oldData, event));
  }, []);

  const handleDataChange2 = useCallback(event => {
    setData(createNewDataFromOld(data, event));
  }, [data]);

  const handleAddItem = useCallback(() => {
    setData(oldData => ({ ...oldData, items: [...oldData.items, { itemId: oldData.items.length + 1, itemName: "", quantity: 0, unitPrice: 0, extendedPrice: 0 } ]}));
  }, []);

  return (
    <React.Fragment>
      <Form>
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
            {data.items.length < 1 && <tr><td colspan="4">No Items</td></tr>}
            {data.items.length > 0 && data.items.map((item, i) => (
              <tr key={item.itemId}>
                <td>
                  <InputField name={`items[${i}].itemName`} value={data.itemName} onChange={handleDataChange} />
                </td>
                <td>
                  <InputField name={`items[${i}].quantity`} value={data.quantity} onChange={handleDataChange} />
                </td>
                <td>
                  <InputField name={`items[${i}].unitPrice`} value={data.itemName} onChange={handleDataChange} />
                </td>
                <td>
                  <InputField name={`items[${i}].extendedPrice`} value={data.extendedPrice} readonly/>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4">
                <Button className="float-end" onClick={handleAddItem}>Add Item</Button>
              </th>
            </tr>
          </tfoot>
        </Table>
        <Container className="p-0">
          {/* Sub Total */}
          <Row className="mb-1">
            <Col md={{ span: 3, offset: 5 }} className="text-end">
              <Form.Label column>Sub Total:</Form.Label>
            </Col>
            <Col md={{ span: 4 }}>
              <TotalField name="subTotal" value={data.subTotal} readOnly />
            </Col>
          </Row>

          {/* Taxes */}
          <Row className="mb-1">
            <Col md={{ span: 3, offset: 5 }} className="text-end">
              <Form.Label column>Taxes:</Form.Label>
            </Col>
            <Col md={{ span: 4 }}>
              <TotalField name="taxes" value={data.taxes} onChange={handleDataChange} />
            </Col>
          </Row>

          {/* Shipping */}
          <Row className="mb-1">
            <Col md={{ span: 3, offset: 5 }} className="text-end">
              <Form.Label column>Shipping:</Form.Label>
            </Col>
            <Col md={{ span: 4 }}>
              <TotalField name="shipping" value={data.shipping} onChange={handleDataChange} />
            </Col>
          </Row>

          {/* Total */}
          <Row className="mb-1">
            <Col md={{ span: 3, offset: 5 }} className="text-end">
              <Form.Label column>Total:</Form.Label>
            </Col>
            <Col md={{ span: 4 }}>
              <TotalField name="total" value={data.total} readOnly />
            </Col>
          </Row>
        </Container>
        {/* <textarea className="text-start" style={{ width: "100%", height: "250px", "marginTop": "10px" }} value={JSON.stringify(data, null, 2)} /> */}
      </Form>
    </React.Fragment>
  );
};


