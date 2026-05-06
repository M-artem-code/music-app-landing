import type { IMenuItem } from "@/types/menu.types";
import { X } from "lucide-react";

interface MenuItemWithId extends IMenuItem {
  id?: string;
}

interface Props {
  items: MenuItemWithId[];
  title?: string;
  className?: string;
  children?: React.ReactNode;
  showX?: boolean;
  onDelete?: (id: string) => void;
}

export const Menu: React.FC<Props> = ({
  className,
  items,
  title,
  children,
  showX = false,
  onDelete,
}) => {
  return (
    <div className={className}>
      {title && (
        <div className="opacity-60 text-sm uppercase font-medium mb-4">
          {title}
        </div>
      )}
      {items.length === 0 && (
        <div className="text-xl extra-bold text-white">No items</div>
      )}
      <ul>
        {items.map((item) => (
          <li className="flex items-center gap-13" key={item.name}>
            <a
              href="#"
              className="cursor-pointer flex items-center gap-3 py-2 text-white hover:text-yellow-500"
            >
              {item.icon && <item.icon size={20} />}
              <span>{item.name}</span>
            </a>
            {showX && item.id && onDelete && (
              <X
                onClick={() => onDelete(item.id!)}
                size={20}
                className="cursor-pointer hover:text-red-500"
              />
            )}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};
