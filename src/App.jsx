import { Route, Routes } from "react-router-dom";
import Admin from "./components/layout/Admin";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Login from "./features/auth/pages/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/*" element={<Admin></Admin>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
