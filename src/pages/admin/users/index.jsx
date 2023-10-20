import { Button, Flex, Image, Pagination, Space, Table } from "antd";
import Search from "antd/es/input/Search";

import {FileImageOutlined} from "@ant-design/icons";


import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ENDPOINT, USER_LIMIT } from "../../../constants";
import { changeUsersPage, getUsers, searchUsers } from "../../../redux/actions/user";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { categories, total, loading, activePage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    total === 0 && dispatch(getUsers());
  }, [dispatch, total]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => data !== null ? <Image src={`${ENDPOINT}upload/${data?._id}.${data?.name.split(".")[1]}`}/> : (<FileImageOutlined />)
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
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
  
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button danger type="primary">
            Delete
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
            <Flex align="center" justify="space-between">
              <h1>All Users({total})</h1>

            </Flex>
            <Search
              placeholder="Searching .."
              onChange={(e) => dispatch(searchUsers(e.target.value))}
              size="large"
            />
    
          </Fragment>
        )}
        dataSource={categories}
        columns={columns}
        pagination={false}
      />
      {total > USER_LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={USER_LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changeUsersPage(page))}
        />
      ) : null}
    </Fragment>
  );
};

export default UsersPage;
