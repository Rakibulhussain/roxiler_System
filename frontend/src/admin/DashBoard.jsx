import Navbar from "./Navbar";
import { CountUser } from "../components/CountUser";

export default function DashBoard() {
  return (
    <div style={styles.container}>
      <Navbar />
      <CountUser />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};