// import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'

// const Footer = () => {
//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
//         </Row>
//       </Container>
//     </footer>
//   )
// }

// export default Footer
import React from 'react';
import { Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-google"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="/">
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section>
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input type="email" id="form5Example21" className="form-control" />
                  <label className="form-label" for="form5Example21">Email address</label>
                </div>
              </div>
              <div className="col-auto">
                <Button variant="outline-light" className="mb-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </form>
        </section>

       

        <section>
          <div className="row d-flex justify-content-center"> 
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-center">Contact Information</h5>
              <ul className="list-unstyled mb-0 text-center">
                <li>
                  <span className="text-white">Email: techelectronic@tech.pk</span>
                </li>
                <li>
                  <span className="text-white">Phone: (123) 456-7890</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mb-4">
          <h5 className="text-uppercase">About Us</h5>
          <p>
            We are a passionate team dedicated to providing the latest and greatest in electronic technology. Our mission is to make cutting-edge gadgets and solutions accessible to everyone. With a commitment to innovation, we strive to enhance your digital lifestyle.
          </p>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Tech Electronic's. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
