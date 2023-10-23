import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

import {
  changePage,
  controlModal,
  deleteCategory,
  editCategory,
  getCategories,
  searchCategories,
  sendCategory,
  showModal,
  uploadImage,
} from "../../../redux/actions/category";
import { getCategoryImage } from "../../../utils/getImage";
import { CATEGORY_LIMIT } from "../../../constants";

import "./style.scss";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    categories,
    total,
    loading,
    activePage,
    isModalOpen,
    selected,
    isModalLoading,
    imageData,
    imageLoading,
    search,
  } = useSelector((state) => state.category);

  useEffect(() => {
    total === 0 && dispatch(getCategories());
  }, [dispatch, total]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData._id;
    dispatch(sendCategory({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => (
        <Image src={getCategoryImage(data)} height={50} width={50} />
      ),
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data) => <p>{data.slice(0, 50)}...</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button
            onClick={() => dispatch(editCategory(form, data))}
            type="primary"
          >
          <img className="editDelete" src="/public/edit.png" />  Edit
          </Button>
          <Button
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this category ?",
                onOk: () => dispatch(deleteCategory(data, search)),
              })
            }
            danger
            type="primary"
          >
          <img className="editDelete" src="/public/delete.png" />  Delete
          </Button>
          <Link to={`/categories/${data}`} type="primary">
            See posts
          </Link>
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
              <h1>Categories({total})</h1>
              <Search
                placeholder="Searching .."
                onChange={(e) => dispatch(searchCategories(e.target.value))}
                size="large"
              />
              <Button
                onClick={() => dispatch(showModal(form))}
                className="modal-btn"
                type="dashed"
                size="large"
              >
                Add category
              </Button>
            </Flex>
          </Fragment>
        )}
        dataSource={categories}
        columns={columns}
        pagination={false}
      />
      {total > CATEGORY_LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={CATEGORY_LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}
      <Modal
        title="Category Modal"
        open={isModalOpen}
        maskClosable={false}
        confirmLoading={isModalLoading}
        onOk={handleOk}
        okText={selected === null ? "Add category" : "Save category"}
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
          <h2>Image:</h2>
          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="category-upload"
              showUploadList={false}
              onChange={(e) => dispatch(uploadImage(e.file.originFileObj))}
            >
              <div className="image-box">
                {imageLoading ? (
                  <LoadingOutlined />
                ) : imageData ? (
                  <img
                    className="upload-image"
                    src={getCategoryImage(imageData)}
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please write category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please write at least 10 words!",
              },
            ]}
          >
            <Input.TextArea
              showCount
              minLength={10}
              maxLength={1000}
              className="category__description__input"
            />
          </Form.Item>
          
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoriesPage;
