import axios from 'axios';
import jwt from 'jsonwebtoken';


const merchantCode = 254702074749;
const secretKey = "Ryn!LS)PXut(A%JdIgEp";


function createResponse(status, message) {
  return { status, message };
}

const generateToken = () => {
  const tokenPayload = {
    merchantCode,
    
    demo: true, 
  };

  const token = jwt.sign(tokenPayload, secretKey, {
    expiresIn: '1h', 
  });

  return token;
}


export const processPayment = async (req, res) => {
  try {
    
    const {
      productName,
      quantity,
      price,
      cardHolderName,
      cardNumber,
      cardType,
      expiryDate,
      securityCode,
    
    } = req.body;


    const payload = {
      merchantCode, 
      product: {
        name: productName,
        price: price,
        quantity: quantity,
      },
      card: {
        card_holder_name: cardHolderName,
        card_number: cardNumber,
        card_type: cardType,
        expiration_month: expiryDate.split('/')[0],
        expiration_year: expiryDate.split('/')[1],
        cvv: securityCode,
      },
    };

    // Generate a JWT token
    const jwtToken = generateToken();

   
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    };

   
    const response = await axios.post('https://www.2checkout.com/checkout/api/1/254702074749/rs/authService', payload, {
      headers,
      
    });
    console.log(response);

    if (response.data.response.status === 'APPROVED') {
    
      console.log("approved");
      res.status(200).json(createResponse('success', 'Payment approved'));
    } else {
      // Payment failed
      res.status(400).json(createResponse('error', 'Payment failed'));
    }
  } catch (error) {
    console.error(error);

    if (error.response) {
      // The request was made, and the server responded with a status code
      res.status(error.response.status).json(createResponse('error', error.response.data));
    } else if (error.request) {
      // The request was made, but no response was received
      res.status(500).json(createResponse('error', 'No response received'));
    } else {
      // Something happened in setting up the request
      res.status(500).json(createResponse('error', 'Internal server error'));
    }
  }
};
