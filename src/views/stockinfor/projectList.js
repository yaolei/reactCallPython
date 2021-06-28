import React from 'react';
import {Table} from 'antd';

const ProjectList = (props) => {
    const columns = [
        {
          title: '名称',
          dataIndex: 'productname',
          key:'productname',
          width: 150,
          ellipsis: true,
        },
        {
            title: '存放仓库地址',
            dataIndex: 'repertory',
            key: 'repertory',
            width: 150,
            ellipsis: true,
          },
          {
            title: '库存数量',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a, b) => a.sellsnum - b.sellsnum,
            width: 150,
            ellipsis: true,
          },
        {
          title: '单价',
          width: 150,
          dataIndex: 'price',
          ellipsis: true,
        },
      ];

      return (
        <>
         <Table  columns={columns} dataSource={props['datas']} />
        </>
    )
}


export default ProjectList