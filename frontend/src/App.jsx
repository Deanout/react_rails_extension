import "./App.css";
import Todos from "./features/todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const API_URL = "http://localhost:3000";

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Todos API_URL={API_URL} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
