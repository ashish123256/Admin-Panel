import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseUrl } from "../../baseUrl";

const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ value }) => (
        <img
          src={value}
          alt="Employee"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "mobileNo",
    },
    {
      Header: "Designation",
      accessor: "designation",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Course",
      accessor: "courses",
      Cell: ({ value }) => (
        <span>{value && value.length > 0 ? value.join(", ") : ""}</span>
      ),
    },
    {
      Header: "Created Date",
      accessor: "createdAt",
      Cell: ({ value }) => {
        const dateObject = new Date(value);
        const formattedDate = dateObject.toLocaleDateString();
        return <span>{formattedDate}</span>;
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex gap-5 font-semibold">
          <Link to={`/edit/${row.original._id}`}>Edit</Link>
          <Link to={`/delete/${row.original._id}`}>Delete</Link>
        </div>
      ),
    },
  ];
  

const EmployeeList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const token = currentUser?.token;
  

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/employee`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const Employees = await res.json();
        setData(Employees);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const filterData = useMemo(() => {
    return data.filter((employee) => {
      return employee.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    { columns, data: filterData, initialState: { pageSize: 6 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="px-16 py-4 mt-16 text-md bg-green-200">
      <div className="flex justify-between mb-4 items-center">
        <form className="w-80 flex">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </form>

        <div className="flex gap-20 ml-20">
          <h1 className="font-semibold">Total Count: {data.length}</h1>
          <Link
            to={"/createEmployee"}
            className="px-2 py-1 bg-blue-500 font-semibold rounded-md text-white"
          >
            + Create Employee
          </Link>
        </div>
      </div>
      <table
        {...getTableProps()}
        className="min-w-full border-gray-300 rounded-md overflow-hidden text-sm"
      >
        <thead className="bg-blue-600 text-white">
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="p-3 text-left font-semibold"
              key={index}
            >
              {headerGroup.headers.map((col) => (
                <th
                  {...col.getHeaderProps(col.getSortByToggleProps())}
                  className="p-3 text-left font-semibold"
                  key={col.id}
                >
                  <div className="flex items-center">
                    {col.render("Header")}
                    {col.isSorted && (
                      <span className="ml-2">
                        {col.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="even:bg-gray-100 hover:bg-gray-200 bg-blue-100"
                key={row.id}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-3"
                    key={cell.column.id}
                  >
                    {cell.column.id === "image"
                      ? cell.value && (
                          <img
                            src={cell.value}
                            alt="Employee"
                            style={{ width: "50px", height: "50px" }}
                          />
                        )
                      : cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center gap-2 mt-3 font-semibold">
        <button
          className="px-2 py-1 bg-black text-white rounded-md"
          onClick={previousPage}
          disabled={!pageIndex}
        >
          Previous
        </button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button
          className="px-2 py-1 bg-black text-white rounded-md"
          onClick={nextPage}
          disabled={pageIndex + 1 === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
