export function Icon({ children, size = 20, strokeWidth = 1.7, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></Icon>;
export const BagIcon = (p) => <Icon {...p}><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></Icon>;
export const MenuIcon = (p) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>;
export const CloseIcon = (p) => <Icon {...p}><path d="m6 6 12 12M18 6 6 18"/></Icon>;
export const ArrowUpRightIcon = (p) => <Icon {...p}><path d="M7 17 17 7M8 7h9v9"/></Icon>;
export const ArrowRightIcon = (p) => <Icon {...p}><path d="M4 12h15M13 6l6 6-6 6"/></Icon>;
export const MinusIcon = (p) => <Icon {...p}><path d="M5 12h14"/></Icon>;
export const PlusIcon = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
export const TrashIcon = (p) => <Icon {...p}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></Icon>;
export const ChevronDownIcon = (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>;
