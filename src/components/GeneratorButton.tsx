import React from 'react';
import { generateCertificate } from "../services/GenerateCertificate";
import { FaLinkedin } from 'react-icons/fa';

interface Person {
  name: string;
  email: string;
  dataEmissao: string;
  // Adicione outros campos necessários
}

interface GeneratorButtonProps {
  selectedPerson: Person;
}

export const GeneratorButton = ({ selectedPerson }: GeneratorButtonProps) => {
  const handleCertificateDownload = () => {
    generateCertificate(selectedPerson);
  };

  const handleLinkedInShare = () => {
    const url = "URL_DO_SEU_PDF"; // Substitua com o URL do seu PDF
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        className="bg-primary hover:bg-primary-dark py-2 px-4 text-white font-bold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        onClick={handleCertificateDownload}
      >
        Baixe aqui seu certificado {selectedPerson?.name}
        <i className="fas fa-download ml-2"></i>
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-800 py-2 px-4 text-white font-bold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        onClick={handleLinkedInShare}
      >
        Compartilhar no LinkedIn
        <FaLinkedin className="ml-2" />
      </button>
    </div>
  );
};
