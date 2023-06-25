import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import './BankAccountForm.css'; // Import CSS file for styling

const BankAccountForm = () => {
  const [form] = Form.useForm();

  const apiUrl = 'https://ifsc.razorpay.com/';

  const onFinish = async (values) => {
    try {
      const response = await fetch(apiUrl + values.ifsc, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
    } catch (e) {
      console.log(e);
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
          name="panNumber"
          rules={[
            { required: true, message: 'Please enter PAN Number' },
            { pattern: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/, message: 'Invalid PAN Number' },
          ]}
        >
          <Input placeholder="Enter PAN Number (example: DTHPG3189P)" />
        </Form.Item>

        <Form.Item
          label="Aadhar Number"
          name="aadharNumber"
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
