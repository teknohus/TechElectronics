
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import { getOrderDetails, deliverOrder } from '../actions/orderActions';
// import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

// const OrderScreen = ({ match, history }) => {
//   const orderId = match.params.id;

//   const dispatch = useDispatch();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   const orderDeliver = useSelector((state) => state.orderDeliver);
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push('/login');
//     }

//     if (!order || successDeliver || order._id !== orderId) {
//       dispatch({ type: ORDER_DELIVER_RESET });
//       dispatch(getOrderDetails(orderId));
//     }
//   }, [dispatch, orderId, successDeliver, order, history, userInfo]);

//   const deliverHandler = () => {
//     dispatch(deliverOrder(order));
//   };

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>{' '}
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                 {order.shippingAddress.postalCode},{' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">Delivered on {order.deliveredAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid</Message>
//               ) : userInfo.isAdmin ? (
//                 <Message variant="info"> Order Not Paid</Message>
//               ) : order.paymentMethod === 'Cash On Delivery' ? (
//                 <Message variant="info">Not Paid. Please pay when delivered.</Message>
//               ) : (
//                 <Message variant="danger">
//                   Not Paid. Please pay your bill for further process.
//                   <Button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => {
//                       window.location.href = `https://secure.2checkout.com/checkout/buy?merchant=254702074749&currency=USD&tpl=default&dynamic=1&prod=Logitech+G-Series+Gaming+Mouse%3BSony+Playstation+4+Pro+White+Version&price=49.99%3B399.99&type=digital%3Bdigital&qty=1%3B10&signature=d47c0d54b17184a9c6473ae60855e417e6b9e8f052dd64a8d4ddc7152bb571f7`;
//                     }}
//                   >
//                     Pay Bill (${order.totalPrice})
//                   </Button>
//                 </Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>{item.name}</Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {loadingDeliver && <Loader />}
//               {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//                 <ListGroup.Item>
//                   <Button
//                     type="button"
//                     className="btn btn-block"
//                     onClick={deliverHandler}
//                   >
//                     Mark As Delivered
//                   </Button>
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default OrderScreen;
////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card, Button, Modal, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import { getOrderDetails, deliverOrder,payOrder, } from '../actions/orderActions';
// import { ORDER_DELIVER_RESET ,ORDER_PAY_RESET, } from '../constants/orderConstants';
// import { PayPalButton } from 'react-paypal-button-v2';

// const OrderScreen = ({ match, history }) => {
//   const orderId = match.params.id;

//   const dispatch = useDispatch();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   const orderDeliver = useSelector((state) => state.orderDeliver);
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [cardHolderName, setCardHolderName] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardType, setCardType] = useState('American Express');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [securityCode, setSecurityCode] = useState('');


//   const [sdkReady, setsdkReady] = useState(false);

// const orderPay = useSelector(state => state.orderPay)
// const {  success: successPay } = orderPay


//   useEffect(() => {
//     if (!userInfo) {
//         history.push('/login')
//     }
//     const addPaypalscript = async () => {
//         const { data: clientId } = await axios.get('/api/config/paypal ')
//         const script = document.createElement('script')
//         script.type = 'text/javascript'
//         script.async = true
//         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
//         script.onload = () => {
//             setsdkReady(true)
//         }
//         document.body.appendChild(script)

//     }
//     if (!order || successPay || successDeliver || order._id !== orderId) {
//         dispatch({
//             type: ORDER_PAY_RESET
//         })
//         dispatch({
//             type: ORDER_DELIVER_RESET
//         })
//         dispatch(getOrderDetails(orderId))
//     } else if (!order.isPaid) {
//         if (!window.paypal) {
//             addPaypalscript();
//         } else {
//             setsdkReady(true)
//         }
//     }

// }, [dispatch, orderId, successPay, orderPay, successDeliver, userInfo])
//   const deliverHandler = () => {
//     dispatch(deliverOrder(order));
//   };
//   const successpaymenthandler = (paymentResult) => {
//     console.log(paymentResult)
//     dispatch(payOrder(orderId, paymentResult))
// }

//   // const handlePaymentSubmit = async () => {
//   //   try {
//   //     // Send a request to your backend to process the payment
//   //     const response = await axios.post('https://www.2checkout.com/checkout/api/payment/process', {

//   //       sellerId: "254702074749",
//   //       publishableKey: "77FD9A5B-5ED9-43BF-8A6E-9F1E0A3294D0",

//   //       productName: order.productName,
//   //       quantity: order.qty,
//   //       price: order.totalPrice,
//   //       cardHolderName,
//   //       cardNumber,
//   //       cardType,
//   //       expiryDate,
//   //       securityCode,
//   //     });


//   //     const paymentToken = response.data.token;


//   //     alert('Payment successful! Token: ' + paymentToken);


//   //     setShowPaymentDialog(false);
//   //   } catch (error) {

//   //     alert('Payment failed. Please try again or check your payment details.');
//   //   }

//   // };


//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>{' '}
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                 {order.shippingAddress.postalCode},{' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">Delivered on {order.deliveredAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               {/* <h2>Payment Method</h2>
//   <p>
//     <strong>Method: </strong>
//     {order.paymentMethod}
//   </p>
//   {order.isPaid ? (
//     <Message variant="success">Paid</Message>
//   ) : userInfo.isAdmin ? (
//     <Message variant="info"> Order Not Paid</Message>
//   ) : order.paymentMethod === 'Cash On Delivery' ? (
//     <Message variant="info">Not Paid. Please pay when delivered.</Message>
//   ) : 
 
//   (
//     <Message variant="danger">
//       Not Paid. Please pay your bill for further process.
//       <Button
//         type="button"
//         className="btn btn-primary"
//         onClick={() => setShowPaymentDialog(true)}
//       >
//         Pay Bill (${order.totalPrice})
//       </Button>
//     </Message>
//   )} */}
//            <h2>Payment Method</h2>
// <p>
//   <strong>Method: </strong>
//   {order.paymentMethod}
// </p>
// {order.isPaid ? (
//   <Message variant="success">Paid</Message>
// ) : userInfo.isAdmin ? (
//   <Message variant="info"> Order Not Paid</Message>
// ) : order.paymentMethod === 'Cash On Delivery' ? (
//   <Message variant="info">Not Paid. Please pay when delivered.</Message>
// ) : sdkReady ? (
//   order.paymentMethod === 'PayPal' ? (
//     <div>
//       <Message variant="info">Not Paid.</Message>
//       <div className="paypalbuttons">
//         <PayPalButton className="buttonsp" amount={order.totalPrice} onSuccess={successpaymenthandler} />
//       </div>
//     </div>
//   ) : order.paymentMethod === '2Checkout' ? (
//     <Message variant="danger">
//       Not Paid. Please pay your bill for further process.
//       <button type="button" className="btn btn-primary" onClick={() => setShowPaymentDialog(true)}>
//         Pay Bill (${order.totalPrice})
//       </button>
//     </Message>
//   ) : (
//     <Message variant="danger">Unsupported Payment Method</Message>
//   )
// ) : (
//   <Loader /> // Display a loader while PayPal SDK is loading
// )}


//             </ListGroup.Item>
//             {/* ... Order Items section remains unchanged ... */}
//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>{item.name}</Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           {/* ... Order Summary section remains unchanged ... */}
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {loadingDeliver && <Loader />}
//               {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//                 <ListGroup.Item>
//                   <Button
//                     type="button"
//                     className="btn btn-block"
//                     onClick={deliverHandler}
//                   >
//                     Mark As Delivered
//                   </Button>
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>

//       {/* Payment Dialog */}
      // <Modal show={showPaymentDialog} onHide={() => setShowPaymentDialog(false)}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Payment Details</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     {/* <Form onSubmit={handlePaymentSubmit}> */}
      //     <Form>
      //       <Form.Group controlId="cardHolderName">
      //         <Form.Label>Card Holder Name</Form.Label>
      //         <Form.Control
      //           type="text"
      //           placeholder="Enter card holder name"
      //           value={cardHolderName}
      //           onChange={(e) => setCardHolderName(e.target.value)}
      //         />
      //       </Form.Group>
      //       <Form.Group controlId="cardNumber">
      //         <Form.Label>Card Number</Form.Label>
      //         <Form.Control
      //           type="text"
      //           placeholder="Enter card number"
      //           value={cardNumber}
      //           onChange={(e) => setCardNumber(e.target.value)}
      //         />
      //       </Form.Group>
      //       <Form.Group controlId="cardType">
      //         <Form.Label>Card Type</Form.Label>
      //         <Form.Control
      //           as="select"
      //           value={cardType}
      //           onChange={(e) => setCardType(e.target.value)}
      //         >
      //           <option value="American Express">American Express</option>
      //           <option value="Discover">Discover</option>
      //           <option value="JCB">JCB</option>
      //         </Form.Control>
      //       </Form.Group>
      //       <Form.Group controlId="expiryDate">
      //         <Form.Label>Expiry Date</Form.Label>
      //         <Form.Control
      //           type="text"
      //           placeholder="MM/YYYY"
      //           value={expiryDate}
      //           onChange={(e) => setExpiryDate(e.target.value)}
      //         />
      //       </Form.Group>
      //       <Form.Group controlId="securityCode">
      //         <Form.Label>Security Code</Form.Label>
      //         <Form.Control
      //           type="text"
      //           placeholder="Enter security code"
      //           value={securityCode}
      //           onChange={(e) => setSecurityCode(e.target.value)}
      //         />
      //       </Form.Group>
      //       <Button variant="primary" type="submit">
      //         Pay(${order.totalPrice})
      //       </Button>
      //     </Form>
      //   </Modal.Body>
      // </Modal>
//     </>
//   );
// };

// export default OrderScreen;
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
     
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
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
