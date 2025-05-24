import { Suspense } from "react";
import Tutorial from "../_components/Tutorial";
import ParadiseLoading from "../loading";

function ParadiseTutorialPage() {
  return (
    <Suspense fallback={<ParadiseLoading />}>
      <div
        style={{
          height: "100%",
          minHeight: "calc(var(--vh, 1vh) * 100)",
          overflowY: "hidden",
        }}
      >
        <Tutorial />
      </div>
    </Suspense>
  );
}

export default ParadiseTutorialPage;
