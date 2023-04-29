interface Props {
  name: string;
  src: string;
  width: string;
}

export const SubjectImg = (props: Props) => {
  return (
    <img
      src={props.src}
      style={{
        paddingTop: "4px",
        width: props.width,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
      alt={props.name}
    />
  );
};
