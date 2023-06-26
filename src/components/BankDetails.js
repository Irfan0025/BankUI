import React from "react";
import { Form, Input, Button, Modal, Row, Col } from "antd";

import { BankOutlined } from "@ant-design/icons";

import Background from "./Background";
import "./Background.css";

const BankAccountForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "https://bankdetailsvalidation.onrender.com/bank-accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        showModal(data);
        form.resetFields();
      } else if (response.status === 400) {
        const error = await response.text();
        console.log("Validation Error:", error);
        alert(error);
      } else {
        const error = await response.text();
        console.log("Error:", error);
        alert(error);
      }
    } catch (error) {
      console.log("Request failed:", error);
      alert("Request failed. Please try again.");
    }
  };

  const showModal = (responseData) => {
    Modal.info({
      title: "IFSC Details",
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
    <>
      <div className="container">
        <Background />

        <div className="bank-account-form-container">
          <h1>Welcome to the Bank of USA</h1>
          <div className="form-container" style={{ marginLeft: "80px" }}>
            <Form
              form={form}
              style={{ marginLeft: "50px" }}
              name="bankAccountForm"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label={
                  <span className="bank-account-form-container_input">
                    <strong> Name</strong>
                  </span>
                }
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <span className="icon bank-account-form-icon">
                  <BankOutlined />
                </span>
                <Input
                  placeholder="Enter Name"
                  className="input-bar"
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="bank-account-form-container_input">
                    <strong>IFSC</strong>
                  </span>
                }
                name="ifsc"
                rules={[{ required: true, message: "Please enter IFSC code" }]}
              >
                <span className="icon bank-account-form-icon">
                  <BankOutlined />
                </span>
                <Input
                  placeholder="Enter IFSC code"
                  className="input-bar"
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="bank-account-form-container_input">
                    <strong> Account Number</strong>
                  </span>
                }
                name="accountNumber"
                rules={[
                  { required: true, message: "Please enter account number" },
                ]}
              >
                <span className="icon bank-account-form-icon">
                  <BankOutlined />
                </span>
                <Input
                  placeholder="Enter Account Number"
                  className="input-bar"
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="bank-account-form-container_input">
                    <strong> PAN Number</strong>
                  </span>
                }
                name="pan"
                rules={[
                  { required: true, message: "Please enter PAN Number" },
                  {
                    pattern: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/,
                    message: "Invalid PAN Number",
                  },
                ]}
              >
                <span className="icon bank-account-form-icon">
                  <BankOutlined />
                </span>
                <Input
                  placeholder="Enter PAN Number (example: DTHPG3189P)"
                  className="input-bar"
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    <strong>Aadhar Number</strong>
                  </span>
                }
                name="aadhar"
                rules={[
                  { required: true, message: "Please enter Aadhar Number" },
                  {
                    pattern: /^\d{4}\s\d{4}\s\d{4}$/,
                    message: "Invalid Aadhar Number",
                  },
                ]}
              >
                <span className="icon bank-account-form-icon">
                  <BankOutlined />
                </span>
                <Input
                  placeholder="Enter Aadhar Number (example: 1234 5678 9012)"
                  className="input-bar"
                  size="small"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAccountForm;
