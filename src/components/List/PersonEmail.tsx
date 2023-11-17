interface PersonEmailProps {
  email: string;
}
export const PersonEmail = (props: PersonEmailProps) => {
  const { email } = props;

  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl">E-mail:</h2>
      <p className="mb-2 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {email}
      </p>
    </>
  );
};
