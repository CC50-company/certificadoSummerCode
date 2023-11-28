import { useEffect, useState } from "react";
import { ListPage } from "./List/ListPage";
import { PersonEmail } from "./List/PersonEmail";
import { GeneratorButton } from "./GeneratorButton";
import { DataEmissao } from "./List/DataEmissao";
import { NomeCompleto } from "./List/NomeCompleto";

// Definindo a interface Person
interface Person {
  name: string;
  email: string;
  dataEmissao: string; // Mantido como string para consistência
}

// Props para o componente List
interface ListProps {
  people: Person[];
}

const List: React.FC<ListProps> = ({ people }) => {
  const [personIndex, setPersonIndex] = useState<number>(0);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (people.length > 0 && personIndex < people.length) {
      setSelectedPerson(people[personIndex]);
    } else {
      setPersonIndex(0);
      setSelectedPerson(null);
    }
  }, [people, personIndex]);

  return (
    <div className="list-container">
      <h2 className="list-title">
        Certificado Emitido
      </h2>
      {people.length > 0 ? (
        <div className="list-content">
          {selectedPerson && (
            <>
              <NomeCompleto nome={selectedPerson.name} />
              <PersonEmail email={selectedPerson.email} />
              {/* Conversão de string para Date feita aqui */}
              <DataEmissao dataEmissao={new Date(selectedPerson.dataEmissao)} />
            </>
          )}
          <ListPage
            projectIndex={personIndex}
            setProjectIndex={setPersonIndex}
            projectCount={people.length}
          />
          {selectedPerson && <GeneratorButton selectedPerson={selectedPerson} />}
        </div>
      ) : (
        <h1>Preencha todos os dados para emitir.</h1>
      )}
    </div>
  );
};

export { List, type Person };
