import { Suspense } from 'react';
import Mid from './_components/Mid';
import { YuniverseBold } from './_components/paradiseFonts';
import Smoke from './_components/Smoke';
import styles from './_styles/paradise.module.css';
import ParadiseLoading from './loading';

function ParadisePage() {
  return (
    <Suspense fallback={<ParadiseLoading />}>
      <div className={styles.backdiv}>
        <div className={styles.maindiv}>
          <div className={styles.leftdiv}></div>

          <div className={styles.middiv}>
            <Smoke />
            <table style={{ width: '100%', height: '100%' }}>
              <tbody>
                <tr style={{ height: '5%' }}>
                  <td
                    className={`${styles.introedge} ${YuniverseBold.className}`}
                    style={{ borderLeft: '0', borderTop: '0' }}
                  >
                    <p className={styles.woop}>웈</p>
                  </td>
                  <td className={styles.intromiddle} style={{ borderTop: '0' }}></td>
                  <td
                    className={`${styles.introedge} ${YuniverseBold.className}`}
                    style={{ borderRight: '0', borderTop: '0' }}
                  >
                    <p className={styles.woop}>웉</p>
                  </td>
                </tr>
                <tr style={{ height: '90%' }}>
                  <td className={styles.introedge} style={{ borderLeft: '0' }}></td>
                  <td className={styles.intromiddle}>
                    <Mid />
                  </td>
                  <td className={styles.introedge} style={{ borderRight: '0' }}></td>
                </tr>
                <tr style={{ height: '5%' }}>
                  <td
                    className={`${styles.introedge} ${YuniverseBold.className}`}
                    style={{ borderLeft: '0', borderBottom: '0' }}
                  >
                    <p className={styles.woop}>웉</p>
                  </td>
                  <td className={styles.intromiddle} style={{ borderBottom: '0' }}></td>
                  <td
                    className={`${styles.introedge} ${YuniverseBold.className}`}
                    style={{ borderRight: '0', borderBottom: '0' }}
                  >
                    <p className={styles.woop}>웈</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.rightdiv}></div>
        </div>
      </div>
    </Suspense>
  );
}

export default ParadisePage;
