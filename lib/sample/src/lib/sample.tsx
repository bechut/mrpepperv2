import styles from './sample.module.scss';

/* eslint-disable-next-line */
export interface SampleProps {}

export function Sample(props: SampleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Sample!</h1>
    </div>
  );
}

export default Sample;
