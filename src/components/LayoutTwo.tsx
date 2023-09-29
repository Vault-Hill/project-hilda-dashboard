type Props = {
  main: React.ReactNode;
};

const LayoutTwo: React.FC<Props> = ({ main }) => {
  return (
    <>
      <div>{main}</div>
    </>
  );
};

export default LayoutTwo;
