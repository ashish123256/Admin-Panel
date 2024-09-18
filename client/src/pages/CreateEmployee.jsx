import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
const CreateEmployee = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = currentUser?.token;

  
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [error, setError] = useState("");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: [],
  });

  const [image, setImage] = useState("");

 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmployeeData((prevData) => {
      if (type === "checkbox") {
        const updatedCourses = checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value);

        return {
          ...prevData,
          [name]: updatedCourses,
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", employeeData.name);
      formdata.append("email", employeeData.email);
      formdata.append("mobileNo", employeeData.mobileNo);
      formdata.append("designation", employeeData.designation);
      formdata.append("gender", employeeData.gender);
      formdata.append("courses", employeeData.courses);
      if (image) {
        formdata.append("image", image);
      }

      const res = await fetch(`${baseUrl}/api/employee/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
        
      });
  
      if (res.ok) {
        navigate("/employee-list");
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };
 

  return (
    <div className=" flex items-center justify-center h-screen">
      <div className="max-w-[60%] bg-gray-100 border rounded-md p-8">
        <h1 className="text-2xl font-semibold mb-4">Create Employee</h1>
        {error && (
          <p className="px-3 py-1 rounded-md mb-4 font-semibold bg-red-500">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 ">
          <div className="col-span-2 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Name:
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Email:
              <input
                type="text"
                name="email"
                value={employeeData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile:
              <input
                type="text"
                name="mobileNo"
                value={employeeData.mobileNo}
                onChange={handleInputChange}
                maxLength={10}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-600"
            >
              Designation:
            </label>
            <select
              id="designation"
              name="designation"
              value={employeeData.designation}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select a designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Courses:
            </label>
            <div className="flex mt-3">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="courses"
                  value="MCA"
                  checked={employeeData.courses.includes("MCA")}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                MCA
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="courses"
                  value="BCA"
                  checked={employeeData.courses.includes("BCA")}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="courses"
                  value="BSc"
                  checked={employeeData.courses.includes("BSc")}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                BSc
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gender:
              <div className="flex mt-3">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={employeeData.gender === "Male"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={employeeData.gender === "Female"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Female
                </label>
              </div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Image
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="png,jpg,jpeg"
                autoFocus
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
