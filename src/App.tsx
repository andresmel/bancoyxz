import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/routes";
import "./App.css";
function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
