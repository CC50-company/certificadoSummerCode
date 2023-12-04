import { useState } from "react";
import { checkPersonStatus, getCertificate } from "../services/GenerateCertificate";
import { PersonStatus } from '../../api/src/modules/certificate-generator/entities/status.enum'


interface Person {
  name: string;
  email: string;
  dataEmissao: Date;
}

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

  const data = () => {
    const date = person.dataEmissao;
    const stringDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return stringDate;
  };

  async function addUnathorizedPerson(){
    window.alert("Email não autorizado.")
  }

  async function addRegisteredPerson(){
    const certificateUrl = await getCertificate(person.email)
    if (!certificateUrl){
      window.alert("O certificado do email já foi gerado. Mas houve um erro ao gerar um link para acessá-lo. Por favor, entre em contato com o professor.")
      return
    }
    window.alert("O certificado do email já foi gerado. Seu link é: " + certificateUrl)
  }

  async function addAthorizedPerson(){
    props.setPeople([...props.people, person]);
    setPerson({ ...initialPerson, dataEmissao: person.dataEmissao });
  }

  const addPersonStrategies = {
    [PersonStatus.FORBIDDEN]: addUnathorizedPerson, 
    [PersonStatus.ALLOWED]: addAthorizedPerson, 
    [PersonStatus.GENERATED]: addRegisteredPerson, 
  }

  const addPerson = async () => {
    const personStatus = await checkPersonStatus(person.email);
    const addPersonStrategy = addPersonStrategies[personStatus];
    await addPersonStrategy();
  };

  return (
    <form className="flex flex-col items-left py-4 w-[90%] max-w-sm mb-">
      <h1 className="centered-text text-white font-semibold text-lg md:text-xl bg-center">Preencha seus Dados e pegue o seu certificado!</h1>
      
      <label htmlFor="name" className="text-white font-semibold text-lg md:text-xl " style={{ marginTop: '20px'}}>
        Nome completo
      </label>
      <input
        id="name"
        className="mb-4 flex appearance-none p-2 md:text-md bg-[#303030] rounded-full"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.currentTarget.value })}
      />

      <label htmlFor="email" className="text-white font-semibold text-lg md:text-xl">
        Email
      </label>
      <input
        id="email"
        className="mb-4 flex appearance-none p-2 md:text-md bg-[#303030] rounded-full"
        placeholder="Ex.: exemplo.cc50@gmail.com"
        value={person.email}
        onChange={(e) => setPerson({ ...person, email: e.currentTarget.value })}
      />

      <label htmlFor="dataEmissao" className="text-white font-semibold text-lg md:text-xl">
        Data de emissão
      </label>
      <input
        id="dataEmissao"
        type="date"
        value={data()}
        onChange={(e) => {
          const dateInput = e.currentTarget.value;
          let dateParts = dateInput.split("-").map(Number);
          dateParts[1]--;
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
