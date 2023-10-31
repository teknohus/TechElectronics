// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProductReview } from '../actions/productActions';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


// const Review = ({ productId, orderId }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [reviewSubmitted, setReviewSubmitted] = useState(false);
//   const dispatch = useDispatch();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');

//   const submitHandler = (e) => {
//     e.preventDefault();

//     // Check if a rating has been selected
//     if (rating === 0) {
//       setAlertMessage('Please select a rating before submitting your review.');
//       setShowAlert(true);
//       return;
//     }

//     // Dispatch an action to create a product review
//     dispatch(createProductReview(productId, { rating, comment, orderId }));

//     // Clear the input fields
//     setRating(0);
//     setComment('');
//     setReviewSubmitted(true);
//   };

//   return (
//     <div>
//       {showAlert && (
//         <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
//           {alertMessage}
//         </Alert>
//       )}

//       {userInfo ? (
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId='rating'>
//             <Form.Label>Rating</Form.Label>
//             <Form.Control
//               as='select'
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             >
//               <option value='0'>Select...</option>
//               <option value='1'>1 - Poor</option>
//               <option value='2'>2 - Fair</option>
//               <option value='3'>3 - Good</option>
//               <option value='4'>4 - Very Good</option>
//               <option value='5'>5 - Excellent</option>
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId='comment'>
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as='textarea'
//               row='3'
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Button type='submit' variant='primary'>
//             Submit Review
//           </Button>
//         </Form>
//       ) : (
//         <p>
//           Please <Link to='/login'>sign in</Link> to write a review.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Review;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview } from '../actions/productActions';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Review = ({ productId, orderId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // Step 1: Add reviewSubmitted state
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if a rating has been selected
    if (rating === 0) {
      setAlertMessage('Please select a rating before submitting your review.');
      setShowAlert(true);
      return;
    }

    // Dispatch an action to create a product review
    dispatch(createProductReview(productId, { rating, comment, orderId }));

    // Clear the input fields
    setRating(0);
    setComment('');
    setReviewSubmitted(true); // Step 2: Set reviewSubmitted to true
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      {reviewSubmitted ? ( // Step 3: Conditionally render a confirmation message
        <Alert variant="success">
          Review has been submitted!
        </Alert>
      ) : userInfo ? (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='rating'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as='select'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value='0'>Select...</option>
              <option value='1'>1 - Poor</option>
              <option value='2'>2 - Fair</option>
              <option value='3'>3 - Good</option>
              <option value='4'>4 - Very Good</option>
              <option value='5'>5 - Excellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Submit Review
          </Button>
        </Form>
      ) : (
        <p>
          Please <Link to='/login'>sign in</Link> to write a review.
        </p>
      )}
    </div>
  );
};

export default Review;
