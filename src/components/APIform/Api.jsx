import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form, Input, Modal } from "antd"
import styles from "./index.module.scss"

function Comment() {

  const columns = [
    {
      title: "userId",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },

  ]

  const [tableComment, setTableComment] = useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  const getTableComment = async () => {
    try {
      const data = await axios.get("https://jsonplaceholder.typicode.com/posts");

      console.log("get", data.data);
      setTableComment([...data.data]);
    } catch (err) {
      console.log("get", err);
    }

  };

  const postTableComment = async () => {
    try {
      const data = await axios.post('https://jsonplaceholder.typicode.com/posts', {

        body: {
          id: 101,
          title: "paras",
          body: "prajapati",
          userId: 1,
        },

      })
      console.log("post", data.data.body);
      setTableComment([...data.data.body])


    } catch (err) {
      console.log("post", err);
    }
  }

  const deleteTableComment = async () => {
    try {
      const data = await axios.delete("https://jsonplaceholder.typicode.com/posts/1", {
      });
      console.log("delete", data.data);
      setTableComment([...data.data])
    } catch (err) {
      console.log("delete", err);
    }
  }

  const putTableComment = async () => {
    try {
      const data = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
        body: {
          id: 1,
          title: "loop",
          body: "code",
          userId: 1,
        }
      })
      console.log("put", data.data.body);
      setTableComment([...data.data.body])
    } catch (err) {
      console.log("put", err);
    }
  }

  useEffect(() => {
    getTableComment();
    deleteTableComment();
    postTableComment();
    putTableComment();
  }, []);

  const onShowModal = () => {
    setOpenModal(true)
  }

  const handleOk = () => {
    setOpenModal(false)
  }

  const handleCancle = () => {
    setOpenModal(false)
  }

  const onFinish = (e) => {
    console.log("post", e);
  }

  const handleDeleteClick = (index) => {
    const newData = tableComment;
    console.log("paras", index);
    newData.splice(index, 1);
    setData([...newData]);
  };

  return (
    <div>
      <div className={styles.Addbutton}>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={onShowModal}
        >
          Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={tableComment}
        pagination={{ total: tableComment.length }}
      />

      <Modal
        visible={openModal}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancle}
      >
        <Row justify="center" className={styles.Main}>
          <Col xl={22}>
            <Form onFinish={onFinish}>
              <Form.Item name="title">
                <Input
                  name="title"
                  placeholder="title"
                />
              </Form.Item>

              <Form.Item name="body">
                <Input
                  name="body"
                  placeholder="body"
                />
              </Form.Item>

              <Row justify="space-around">
                <Col xl={12} >
                  <Button
                    size="large"
                    shape="round"
                    htmlType="submit"
                    className={styles.Submit}
                  >
                    Submit
                  </Button>

                </Col>
                <Col xl={12} >
                  <Button size="large" shape="round" className={styles.Cancle}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>

          </Col>
        </Row>
      </Modal>
    </div>
  );

}

export default Comment;