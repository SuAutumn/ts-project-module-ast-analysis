import { Input, Button } from "./components";
import CardLayout from "./card";
import { Table } from "./components";
import * as C from "./components";
import "./components";

const App = () => {
  return (
    <CardLayout>
      <div>App</div>
      <Input />
      <Button />
      <Table />
    </CardLayout>
  );
};

export default App;
