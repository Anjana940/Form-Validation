import React, { useState, useEffect, useRef } from 'react';
import './Validation.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const form = useRef();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email_id: '',
    password: '',
    showPassword: false,
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });
  const [errors, setErrors] = useState({});

  const notify = (msg) => {
    toast(msg);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First Name is required';
    if (!formData.last_name) newErrors.last_name = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email_id) newErrors.email_id = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone Number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) newErrors.panNo = 'PAN No. is required';
    if (!formData.aadharNo) newErrors.aadharNo = 'Aadhar No. is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    

  const cityOptions = () => {
    if (formData.country === 'India') {
      return (
        <>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
        </>
      );
    } else if (formData.country === 'USA') {
      return (
        <>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </>
      );
    }
    return null;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='contact-page'>
        <header className='height-75'>
          <div className='container h-100 d-flex flex-column align-items-center justify-content-center text-light'>
            <h1 className='text-center fw-semibold'>Sign Up</h1>
          </div>
        </header>

        <div className='container my-5 d-flex justify-content-center'>
          <Form id='contact-form' ref={form} onSubmit={sendEmail}>
            <Row className='mb-3'>
              <Col sm={12} md={6} className='mb-3 mb-md-0'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder='First name'
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}
              </Col>
              <Col sm={12} md={6}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder='Last name'
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}
              </Col>
              <Col sm={12} md={6}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder='Username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className='text-danger'>{errors.username}</span>}
              </Col>
            </Row>

            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email_id'
                value={formData.email_id}
                onChange={handleChange}
              />
              {errors.email_id && <span className='text-danger'>{errors.email_id}</span>}
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={formData.showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <Button variant="secondary" onClick={toggleShowPassword}>
                {formData.showPassword ? 'Hide' : 'Show'}
              </Button>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Phone No.</Form.Label>
              <Row>
                <Col sm={3}>
                  <Form.Control
                    placeholder='Country code'
                    name='country_code'
                    value={formData.country_code}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={9}>
                  <Form.Control
                    placeholder='Phone number'
                    name='phoneNo'
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              {errors.phoneNo && <span className='text-danger'>{errors.phoneNo}</span>}
            </Form.Group>

            <Row className='mb-3'>
              <Col sm={12} md={6}>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as='select'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value=''>Select Country</option>
                  <option value='India'>India</option>
                  <option value='USA'>USA</option>
                  {/* Add more countries as needed */}
                </Form.Control>
                {errors.country && <span className='text-danger'>{errors.country}</span>}
              </Col>
              <Col sm={12} md={6}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  as='select'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value=''>Select City</option>
                  {cityOptions()}
                </Form.Control>
                {errors.city && <span className='text-danger'>{errors.city}</span>}
              </Col>
            </Row>

            <Form.Group className='mb-3'>
              <Form.Label>PAN No.</Form.Label>
              <Form.Control
                placeholder='PAN No.'
                name='panNo'
                value={formData.panNo}
                onChange={handleChange}
              />
              {errors.panNo && <span className='text-danger'>{errors.panNo}</span>}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Aadhar No.</Form.Label>
              <Form.Control
                placeholder='Aadhar No.'
                name='aadharNo'
                value={formData.aadharNo}
                onChange={handleChange}
              />
              {errors.aadharNo && <span className='text-danger'>{errors.aadharNo}</span>}
            </Form.Group>

            
            

            <Button variant="primary btn-lg" type='submit' disabled={!validate()}>Submit</Button>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </Suspense>
  );
}

export default Contact;
