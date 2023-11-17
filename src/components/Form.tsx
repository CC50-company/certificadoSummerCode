import { useState } from "react";

interface FormProps {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  people: Person[];
}

const initialPerson: Person = {
  name: "",
  email: "",
  dataEmissao: new Date(),
};

const Form = (props: FormProps) => {
  const [person, setPerson] = useState<Person>(initialPerson);

  const data: () => string = () => {
    const date = person.dataEmissao;
    const stringDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return stringDate;
  };

  const addPerson = () => {
    props.setPeople([...props.people, person]);
    setPerson({ ...initialPerson, dataEmissao: person.dataEmissao });
  };
  
  return (
    
    <form className="flex flex-col items-left py-4 w-[90%] max-w-sm mb-">
    <h1 className="centered-text text-white font-semibold text-lg md:text-xl bg-center">Preencha seus Dados e pegue o seu certificado!</h1>
  <label
      htmlFor="name"
      className="text-white font-semibold text-lg md:text-xl "  style={{ marginTop: '20px'}}
    >
      Nome completo
    </label>
    <input
      id="name"
      className="mb-4 flex appearance-none p-2 md:text-md bg-[#303030] rounded-full" 
      value={person.name}
      onChange={(e) => setPerson({ ...person, name: e.currentTarget.value })}
    />
    <label
      htmlFor="email"
      className="text-white font-semibold text-lg md:text-xl"
    >
      Email
    </label>
    <input
      id="email"
      className="mb-4 flex appearance-none p-2 md:text-md bg-[#303030] rounded-full"
      placeholder="Ex.: exemplo.cc50@gmail.com"
      value={person.email}
      onChange={(e) =>
        setPerson({ ...person, email: e.currentTarget.value })
      }
    />
    <label
      htmlFor="dataEmissao"
      className="text-white font-semibold text-lg md:text-xl"
    >
      Data de emissão
    </label>
    <input
      id="dataEmissao"
      type="date"
      value={data()}
      onChange={(e) => {
        const dateInput = e.currentTarget.value; // yyyy-mm-dd string format from date input
        let dateParts = dateInput.split("-").map(Number); // split date values
        dateParts[1]--; // fix the current month to use as index of month in Date constructor
        setPerson({
          ...person,
          dataEmissao: new Date(dateParts[0], dateParts[1], dateParts[2]),
        });
      }}
      className="mb-4 flex appearance-none p-2 md:text-md bg-[#303030] rounded-full"
    />
    <button
      type="button"
      onClick={addPerson}
      disabled={!person?.name || !person?.email || !person?.dataEmissao}
      className="px-16 text-white bg-primary font-bold py-2 md:text-xl disabled:opacity-75 md:py-4 rounded-lg"
    >
      Clique para Emitir
    </button>
  </form>
  
  );
};

export { Form };
