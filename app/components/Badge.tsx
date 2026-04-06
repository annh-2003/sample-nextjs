import styles from "./Badge.module.css";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning";
}

export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>
  );
}
