interface MenuToggleProps {
  openNavigation: boolean;
}

export const MenuToggle = ({ openNavigation }: MenuToggleProps) => {
  return (
    <svg
      className="overflow-visible"
      width="22"
      height="14"
      viewBox="0 0 20 12"
      aria-hidden="true"
    >
      <rect
        className="transition-all duration-300 origin-center"
        y={openNavigation ? 5 : 0}
        width="20"
        height="2"
        rx="1"
        fill="currentColor"
        transform={`rotate(${openNavigation ? 45 : 0})`}
      />
      <rect
        className="transition-all duration-300 origin-center"
        y={openNavigation ? 5 : 10}
        width="20"
        height="2"
        rx="1"
        fill="currentColor"
        transform={`rotate(${openNavigation ? -45 : 0})`}
      />
    </svg>
  );
};

export default MenuToggle;
