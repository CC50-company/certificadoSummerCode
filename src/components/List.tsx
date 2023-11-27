import { useEffect, useState } from "react";
import { ListPage } from "./List/ListPage";
import { PersonEmail } from "./List/PersonEmail";
import { GeneratorButton } from "./GeneratorButton";
import { DataEmissao } from "./List/DataEmissao";
import { NomeCompleto } from "./List/NomeCompleto";

// Definindo a interface Person para garantir a tipagem correta
interface Person {
  name: string;
  email: string;
  dataEmissao: string;
}

// Props para o componente List
interface ListProps {
  people: Person[];
}

const List: React.FC<ListProps> = ({ people }) => {
  const [personIndex, setPersonIndex] = useState<number>(0);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (people.length > 0) {
      const lastPersonIndex = people.length - 1;
      setPersonIndex(lastPersonIndex);
      setSelectedPerson(people[lastPersonIndex]);
    }
  }, [people]);

  const updateSelectedPerson = (index: number) => {
    setPersonIndex(index);
    setSelectedPerson(people[index]);
  };

  return (
    <div className="list-container">
      <h2 className="list-title">
        Certificado Emitido
      </h2>
      {people.length > 0 ? (
        <div className="list-content">
          <NomeCompleto nome={selectedPerson?.name} />
          <PersonEmail email={selectedPerson?.email} />
          <DataEmissao dataEmissao={selectedPerson?.dataEmissao} />
          <ListPage
            projectIndex={personIndex}
            setProjectIndex={updateSelectedPerson}
            projectCount={people.length}
          />
          <GeneratorButton selectedPerson={selectedPerson} />
        </div>
      ) : (
        <h1>Preencha todos os dados para emitir.</h1>
      )}
    </div>
  );
};

export { List };
