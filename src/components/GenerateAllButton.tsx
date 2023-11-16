import { generateCertificate } from "../services/GenerateCertificate";

interface GenerateAllButtonProps {
  people: Person[];
}

export const GenerateAllButton = (props: GenerateAllButtonProps) => {
  const { people } = props;

  return (
    <>
      <button
        className="bg-primary py-2 text-white font-bold mt-4"
        onClick={() => people?.forEach((person) => generateCertificate(person))}
      >
        Baixar todos os certificados ({people?.length ?? 0})
      </button>
    </>
  );
};
