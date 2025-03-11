import styles from "./SkeletonLoader.module.scss";

const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonContainer}>
      {/* Top Cards Loader */}
      <div className={styles.skeletonCards}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
      </div>

      {/* Table Loader */}
      <div className={styles.skeletonTable}>
        {/* Table Header Skeleton */}
        <div className={styles.skeletonHeader}>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles.skeletonColumn} />
            ))}
        </div>

        {/* Table Rows Skeleton */}
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles.skeletonRow}>
              {Array(6)
                .fill(0)
                .map((_, j) => (
                  <div key={j} className={styles.skeletonCell} />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
