import React from "react";
import { Input, Button } from "./components";
import CardLayout from "@/card";
import { Table } from "./components";
import Png from "./canvas";

const App = () => {
  return (
    <CardLayout>
      <div>App</div>
      <Input />
      <Button />
      <Table />
      <img src={Png} alt="icon" />
    </CardLayout>
  );
};

export default App;
