import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import Search from "antd/es/input/Search";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIMIT } from "../../../constants";
import {
  changeUsersPage,
  controlModal,
  deleteUser,
  editUser,
  getUsers,
  searchUsers,
  sendUsers,
  showModal,
  uploadImageUser,
} from "../../../redux/actions/user";

import "./style.scss";
import { getUserImage } from "../../../utils/getImage";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    users,
    total,
    loading,
    activePage,
    search,
    isModalOpen,
    isModalLoading,
    selected,
    imageData,
    imageLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    total === 0 && dispatch(getUsers());
  }, [dispatch, total]);

  const handleOk = async () => {
    const values = await form.validateFields();
    dispatch(sendUsers({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => <img src={getUserImage(data)} />,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      render: (data) => <p className="firstName">{data}</p>,
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      render: (data) => <p className="lastName">{data}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button onClick={() => dispatch(editUser(form, data))} type="primary">
            <img className="editDelete" src="/public/edit.png" /> Edit
          </Button>
          <Button
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this user ?",
                onOk: () => dispatch(deleteUser(data, search)),
              })
            }
            danger
            type="primary"
          >
           <img className="editDelete" src="/public/delete.png" /> Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        loading={loading}
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Fragment>
            <Flex
              className="dashboard-title-container"
              align="center"
              justify="space-between"
              gap={36}
            >
              <h1>Users ({total})</h1>
              <Search
                placeholder="Searching .."
                onChange={(e) => dispatch(searchUsers(e.target.value))}
                size="large"
              />
              <Button
                onClick={() => dispatch(showModal(form))}
                className="modal-btn"
                type="dashed"
                size="large"
              >
                Add user
              </Button>
            </Flex>
          </Fragment>
        )}
        dataSource={users}
        columns={columns}
        pagination={false}
      />
      {total > USER_LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={USER_LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changeUsersPage(page, search))}
        />
      ) : null}
      <Modal
        title="User Data"
        open={isModalOpen}
        maskClosable={false}
        confirmLoading={isModalLoading}
        onOk={handleOk}
        okText={selected === null ? "Add user" : "Save user"}
        onCancel={closeModal}
      >
        <Form
          form={form}
          className="modal-form"
          name="category"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item className="userModal">
            <h2>Image:</h2>
            <Upload
              name="avatar"
              listType="picture-card"
              className="category-upload"
              showUploadList={false}
              onChange={(e) => dispatch(uploadImageUser(e.file.originFileObj))}
            >
              <div className="image-box">
                {imageLoading ? (
                  <LoadingOutlined />
                ) : imageData ? (
                  <img
                    className="upload-image"
                    src={getUserImage(imageData)}
                    alt="avatar"
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div
                      className="upload-image"
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                )}
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
