import React from 'react';
import { Form, Input, Button, Modal } from 'antd';

const BankAccountForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('https://bankdetailsvalidation.onrender.com/bank-accounts', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        showModal(data);
        form.resetFields();
      } else if (response.status === 400) {
        const error = await response.text();
        console.log('Validation Error:', error);
        alert(error);
      } else {
        const error = await response.text();
        console.log('Error:', error);
        alert(error);
      }
    } catch (error) {
      console.log('Request failed:', error);
      alert('Request failed. Please try again.');
    }
  };

  const showModal = (responseData) => {
    Modal.info({
      title: 'IFSC Details',
      content: (
        <div>
          <p>Branch: {responseData.BRANCH}</p>
          <p>Bank: {responseData.BANK}</p>
        </div>
      ),
      onOk() {
        form.resetFields();
      },
    });
  };

  return (
    <div className="bank-account-form-container">
      <h1>Bank Account Details</h1>
      <Form form={form} name="bankAccountForm" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>

        <Form.Item
          label="IFSC"
          name="ifsc"
          rules={[{ required: true, message: 'Please enter IFSC code' }]}
        >
          <Input placeholder="Enter IFSC code" />
        </Form.Item>

        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[{ required: true, message: 'Please enter account number' }]}
        >
          <Input placeholder="Enter Account Number" />
        </Form.Item>

        <Form.Item
          label="PAN Number"
          name="pan"
          rules={[
            { required: true, message: 'Please enter PAN Number' },
            { pattern: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/, message: 'Invalid PAN Number' },
          ]}
        >
          <Input placeholder="Enter PAN Number (example: DTHPG3189P)" />
        </Form.Item>

        <Form.Item
          label="Aadhar Number"
          name="aadhar"
          rules={[
            { required: true, message: 'Please enter Aadhar Number' },
            { pattern: /^\d{4}\s\d{4}\s\d{4}$/, message: 'Invalid Aadhar Number' },
          ]}
        >
          <Input placeholder="Enter Aadhar Number (example: 1234 5678 9012)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BankAccountForm;
