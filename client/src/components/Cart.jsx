import {
  Button,
  Col,
  Layout,
  Row,
  Space,
  Statistic,
  Table,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { CreditCard, Trash, User } from "lucide-react";
import { useCart } from "../store/cart";
import { useEffect } from "react";

const Cart = ({remove, removeAll}) => {
  const {totalPrice} = useCart();

  const {count} = useCart(); 
  // console.log(useCart().cart);
  // const {removeAll} = useCart();
  // const {remove} = useCart();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "itemName",
    },

    {
      title: "Price",
      key: "itemPrice",
      dataIndex: "price",
      render: (text, record) => (
        <Space size="middle">
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Quantity",
      key: "itemQuantity",
      dataIndex: "count",
      render: (text, record) => (
        <Space size="middle">
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => remove(record.id)}
            icon={<Trash />}
            type="primary"
            shape="round"
            danger
          >
          </Button>
        </Space>
      ),
    },
  ];

  console.log(totalPrice());

  const total = [0];

  //payment logic

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const token = localStorage.getItem("token");
    const result = await fetch("http://localhost:8000/api/v1/pay/orders", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await result.json();
    console.log(data);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id, currency } = data;
    // const amount = 32900;
    const options = {
      key: process.env.REACT_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: User,
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch("http://localhost:8000/api/v1/pay/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(result);
        const successmsg = await result.json();
        console.log(successmsg);
        alert(successmsg.msg);
      },
      prefill: {
        name: "Ayush",
        email: "ayush@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Medflow Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="w-96">
      <Layout>
        <Content className="items-center">
          <Row justify="end">
            <Col className="items-center pt-4">
              <Button
                shape="round"
                type="primary"
                danger
                icon={<Trash />}
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => removeAll()}
              >
                Empty Cart
              </Button>
            </Col>
          </Row>
          <span className="pb-4">
            Total Items <strong>({count()})</strong>
          </span>
          <Table
            columns={columns}
            dataSource={useCart().cart}
            pagination={false}
          />
          <Row justify="end">
            <Col>
              <Statistic
                title="Total (tax incl)."
                value={`₹  ${totalPrice()}`}
                precision={2}
              />
              <Button
                onClick={displayRazorpay}
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                type="primary"
                icon={<CreditCard />}
              >
                Pay now
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default Cart;
