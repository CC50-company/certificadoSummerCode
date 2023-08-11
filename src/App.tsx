import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { List } from "./components/List";

function App() {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center mb-4 md:mb-0 md:min-h-screen md:justify-evenly lg:w-screen lg:flex-row">
        <Form setPeople={setPeople} people={people} />
        <List people={people} />
      </main>
    </>
  );
}

export default App;
