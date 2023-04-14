import Select from 'react-select';
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';




function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [sortedInfo, setSortedInfo] = useState({})
  const [searchText, setSearchText] = useState("");
  let [filterData] = useState();

  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      timestamp: "timestamp",
      title: "Title of the task",
      description: "Description of the task ",
      status: "John Address",
      duedate: "date"
    },
    {
      id: "2",
      timestamp: "timestamp",
      title: "Title of the task",
      description: "Description of the task ",
      status: "David Address",
      duedate: "date"
    },
    {
      id: "3",
      timestamp: "timestamp",
      title: "Title of the task",
      description: "Description of the task ",
      status: "James Address",
      duedate: "date"
    },
    {
      id: "4",
      timestamp: "timestamp",
      title: "Title of the task",
      description: "Description of the task ",
      status: "Sam Address",
      duedate: "date"
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.id).
          toLowerCase()
          .includes(value.toLowerCase()) ||
          String(record.title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.description)
            .toLowerCase()
            .includes(value.toLowerCase())
      },

    },
    {
      key: "2",
      title: "Timestamp",
      dataIndex: "timestamp",
      render: () => {
        return (

          moment().format("MMM Do YY")

        )
      }
    },
    {
      key: "3",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
    },
    {
      key: "4",
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
      render: () => {
        return (
          <Select options={options} />
        )
      }
    },
    {
      key: "5",
      title: "Due-Date",
      dataIndex: "duedate",
      render: () => {
        return (
          <form action=''>
            <input type='date' />
          </form>
        );
      }

    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const options = [
    { value: 'OPEN', label: 'OPEN' },
    { value: 'WORKING', label: 'WORKING' },
    { value: 'DONE', label: 'DONE' },
    { value: 'OVERDUE', label: 'OVERDUE' },
  ]


  const handleChange = (...sorter) => {
    console.log("sorter", sorter)
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  }



  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 50);

    const newStudent = {
      id: randomNumber,
      timestamp: '',
      title: "Title of the task",
      description: "description of the task",
      status: "",
      duedate: '',
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this to-do entry?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };



  return (
    <div className="App">
      <header className="App-header">
        <Input.Search placeholder='Search here...' style={{ marginBottom: 12 }} onSearch={(value) => {
          setSearchText(value);
        }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }} />

        <Button onClick={onAddStudent} style={{ marginBottom: 8 }}>Add a new Entry</Button>
        <Table columns={columns} dataSource={filterData && filterData.length ? filterData : dataSource} onChange={handleChange}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >

          <Input
            value={editingStudent?.title}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.description}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />

        </Modal>

      </header>
    </div>
  );
}

export default App;
