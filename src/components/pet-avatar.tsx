export function PetAvatar({ size = 48 }: { size?: number }) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: size * 0.55,
          fontWeight: "bold",
          boxShadow: "0 0 0 3px white",
        }}
      >
        🐾
      </div>
    );
}
  