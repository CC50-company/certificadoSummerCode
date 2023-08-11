interface NomeCompletoProps {
  nome: string;
}
export const NomeCompleto = (props: NomeCompletoProps) => {
  const { nome } = props;
  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl">
        Nome completo
      </h2>
      <p className="mb-2 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {nome}
      </p>
    </>
  );
};
