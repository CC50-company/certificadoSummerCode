import { generateCertificate } from "../utils/GenerateCertificate";

interface GeneratorButtonProps {
  selectedPerson: Person;
}

export const GeneratorButton = (props: GeneratorButtonProps) => {
  const { selectedPerson } = props;

  return (
    <>
      <button
        className="bg-primary py-2 text-white font-bold mt-4"
        onClick={() => generateCertificate(selectedPerson)}
      >
        Baixe {selectedPerson?.name}
      </button>
    </>
  );
};
