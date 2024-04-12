import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import StoreManager from "./StoreManager";
import CEO from "./CEO";
import { Button, Card, Carousel, Col, Row } from 'antd';
import Meta from "antd/es/card/Meta";

const Home = () => {
  const [userRole, setUserRole] = useState("");
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null
    ) {
      const token = localStorage.getItem("token");
      const data = jwtDecode(token);
      setUserRole(data.role);
    }
  }, []);

  useEffect(() => {
    const getAllInventories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/inventory/getInventories",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const inventories = await response.json();
        if (!inventories) {
          return window.alert(
            "Unable to fetch inventories, Internal servor error"
          );
        }

        setInventory(inventories.data.inventories);
      } catch (err) {
        console.log(err);
      }
    };

    getAllInventories();
  }, []);

  const contentStyle = {
    height: '300px',
    color: '#fff',
    alignitems: 'center',
    lineHeight: '200px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="flex-1 bg-dark-gray/50 text-white flex justify-center items-center">
      {userRole === "CEO" && <CEO />}
      {userRole === "Store Manager" && <StoreManager />}
      {userRole === "User" && (
        <div className="bg-soft-black p-6 rounded-md aspect-square border border-mid-gray w-full">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>
                <div>
                  <h1>WELCOME TO MEDFLOW</h1>
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <br />
          <Row gutter={16}>
            {inventory.map((item) => (
              <Col span={8}>
                <Card key={item._id} bordered={false} hoverable
                  cover={<img alt="example" style={{ height: '240px', objectFit: 'fill', maxWidth: '100%' }} src="https://www.shutterstock.com/image-photo/pharmaceuticals-antibiotics-pills-medicine-colorful-260nw-1061962874.jpg" />}
                >
                  <Meta title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>{item.name}</div>
                      <div>Price: <b>{item.price}{" "}{item.unit}</b></div>
                    </div>
                  } description={item.description} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      Type: {item.type}
                    </div>
                    <div>
                      Manufacturer: <b> {item.manufacturer}</b>
                    </div>
                  </div>
                  <br />
                  <Button type="primary">Add to Cart</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Home;
