import { YuniverseBold } from './_components/paradiseFonts';
import styles from './_styles/paradise.module.css';

function ParadiseLoading() {
  return (
    <div className={`${styles.loader} ${YuniverseBold.className}`}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div className={styles.loaderimg}>웈</div>
      </div>
    </div>
  );
}

export default ParadiseLoading;
