
import { generateCertificate } from "../services/GenerateCertificate";
import { FaLinkedin } from 'react-icons/fa';

interface Person {
  name: string;
  email: string;
  dataEmissao: Date; // Mantido como string
  // Adicione outros campos necessários
}

interface GeneratorButtonProps {
  selectedPerson: Person | null; // selectedPerson pode ser null
}

export const GeneratorButton = ({ selectedPerson }: GeneratorButtonProps) => {
  const handleCertificateDownload = () => {
    if (selectedPerson) {
      // Criar uma cópia do objeto selectedPerson com dataEmissao convertida para Date
      const personWithDate = {
        ...selectedPerson,
        dataEmissao: new Date(selectedPerson.dataEmissao)
      };

      generateCertificate(personWithDate);
    } else {
      console.error("Nenhuma pessoa selecionada");
      // Aqui, você pode exibir uma mensagem de erro ao usuário
    }
  };

  const handleLinkedInShare = () => {
    if (selectedPerson) {
      const url = "URL_DO_SEU_PDF"; // Substitua com o URL do seu PDF
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      window.open(linkedInUrl, '_blank');
    } else {
      console.error("Nenhuma pessoa selecionada");
      // Aqui, você pode exibir uma mensagem de erro ao usuário
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        className="bg-primary hover:bg-primary-dark py-2 px-4 text-white font-bold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        onClick={handleCertificateDownload}
        disabled={!selectedPerson}
      >
        Baixe aqui seu certificado {selectedPerson?.name}
        <i className="fas fa-download ml-2"></i>
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-800 py-2 px-4 text-white font-bold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        onClick={handleLinkedInShare}
        disabled={!selectedPerson}
      >
        Compartilhar no LinkedIn
        <FaLinkedin className="ml-2" />
      </button>
    </div>
  );
};
