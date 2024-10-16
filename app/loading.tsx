import styles from "@/styles/loader.module.css";

function Loading() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-dvw h-dvh bg-transparent">
        <div
          className={`${styles.loader} relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
