import {  useSelector } from "react-redux";

const Dashboard = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="grid place-content-center h-screen bg-yellow-100">
    <h1 className="text-2xl font-semibold text-center">
      Welcome Admin Panel
    </h1>
    {!currentUser ? (
      <h2>Login to get access</h2>
    ) : (
      <h2>you can now have full access</h2>
    )}
  </div>
  )
}

export default Dashboard
