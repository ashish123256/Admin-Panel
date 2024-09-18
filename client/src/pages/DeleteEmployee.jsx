import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseUrl } from "../../baseUrl";

const DeleteEmployee = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = currentUser?.token;
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const deleteEmployee = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/employee/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        });

        if (response.status === 200) {
          navigate("/employee-list");
        } else {
          const data = await response.json();
          console.log(data.message || "Failed to delete the employee");
        }
      } catch (error) {
        console.log(error.message || "An error occurred");
      }
    };

    if (id && token) {
      deleteEmployee();
    }
  }, [id, token, navigate]);

  return <div>Deleting employee...</div>;
};

export default DeleteEmployee;
