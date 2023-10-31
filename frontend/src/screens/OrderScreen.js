
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,

} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import Review from '../components/Review'; // Check the path to the Review component


const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
 
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 


  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
     
      const Paypalscript = document.createElement('script');
      Paypalscript.type = 'text/javascript';
      Paypalscript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      Paypalscript.async = true;
      Paypalscript.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(Paypalscript);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order,history,userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };


  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  }
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
const [cardInfo, setCardInfo] = useState({
  cardHolderName: '',
  cardNumber: '',
  cvc: '',
  expiry: '',
  email: '',
});
const handleShowCheckoutDialog = () => {
  setShowCheckoutDialog(true);
};

const handleCloseCheckoutDialog = () => {
  setShowCheckoutDialog(false);
};
const handleCheckout= ()=>{

}

 

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                  
                  <ListGroup.Item>
      <h2>Order Items</h2>
      {order.orderItems.length === 0 ? (
        <Message>Order is empty</Message>
      ) : (
        <ListGroup variant="flush">
          {order.orderItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={1}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                {!userInfo.isAdmin && (
                  
                            <Review productId={item.product} orderId={order._id} />
                          )}
                  
                  {/* <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <Review productId={item.product} orderId={order._id} /> */}
                </Col>
                <Col md={4}>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </ListGroup.Item>
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}
          
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                 
                  
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  
                  <Col>${Math.round(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
             
              {order.paymentMethod === 'Cash On Delivery' && !order.isPaid && !userInfo.isAdmin && (
                <ListGroup.Item>
                  <p>Cash on Delivery </p>
                </ListGroup.Item>
              )}
              {order.paymentMethod === '2Checkout' && (
                <>
                <br></br>
               
                 
                 
                  <Button onClick={handleShowCheckoutDialog}> 2 Checkout ${Math.round(order.totalPrice)}</Button>
                  
                  
                </>
              )}
              {order.paymentMethod === 'PayPal' && !order.isPaid  && !userInfo.isAdmin && (
                <>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={Math.round(order.totalPrice)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </>
              )}
              
              
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Modal show={showCheckoutDialog} onHide={handleCloseCheckoutDialog}>
  <Modal.Header closeButton>
    <Modal.Title>Checkout</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      <div className="form-group">
        <label htmlFor="cardHolderName">Card Holder Name</label>
        <input
          type="text"
          className="form-control"
          id="cardHolderName"
          value={cardInfo.cardHolderName}
          onChange={(e) => setCardInfo({ ...cardInfo, cardHolderName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          value={cardInfo.cardNumber}
          onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cvc">CVC</label>
        <input
          type="text"
          className="form-control"
          id="cvc"
          value={cardInfo.cvc}
          onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expiry">Expiry (MM/YYYY)</label>
        <input
          type="text"
          className="form-control"
          id="expiry"
          value={cardInfo.expiry}
          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={cardInfo.email}
          onChange={(e) => setCardInfo({ ...cardInfo, email: e.target.value })}
        />
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseCheckoutDialog}>
      Close
    </Button>
    <Button variant="primary" onClick={handleCheckout}>
      Proceed to Payment ${Math.round(order.totalPrice)}
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default OrderScreen;
