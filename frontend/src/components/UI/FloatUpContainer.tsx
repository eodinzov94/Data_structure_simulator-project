import styles from "./FloatUpContainer.module.css";

const FloatUpContainer = (props: any) => {
  return <div className={styles.form_card}>{props.children}</div>;
};

export default FloatUpContainer;
