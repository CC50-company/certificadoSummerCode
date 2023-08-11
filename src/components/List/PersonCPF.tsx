interface PersonCPFProps {
  cpf: string;
}
export const PersonCPF = (props: PersonCPFProps) => {
  const { cpf } = props;

  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl">CPF:</h2>
      <p className="mb-2 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {cpf}
      </p>
    </>
  );
};
