import { Icon } from '@/components';
import { ActionIcon, Menu } from '@mantine/core';
import { Editor } from '@tiptap/react';
import { useCallback, useState } from 'react';
const TableController = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const insertTable = useCallback(
    (rows: number, cols: number) => {
      if (!editor) return;

      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: true })
        .run();
    },
    [editor]
  );

  return (
    <>
      <Menu shadow="md" width={220} position="bottom-start" withArrow>
        <Menu.Target>
          <ActionIcon
            variant={editor.isActive('table') ? 'filled' : 'default'}
            radius="md"
            size="md"
            aria-label="Insert Table"
            title="Insert table"
          >
            <Icon icon={'majesticons:table-plus-line'} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <TableSizeSelector onSelect={insertTable} />
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default TableController;

interface TableSizeSelectorProps {
  onSelect: (rows: number, cols: number) => void;
}

const TableSizeSelector = ({ onSelect }: TableSizeSelectorProps) => {
  const [hoveredSize, setHoveredSize] = useState({ rows: 0, cols: 0 });
  const rows = 5;
  const cols = 5;

  return (
    <div className="px-4 py-2">
      <div className="mb-2 text-sm font-medium">Insert Table</div>
      <div className="grid grid-cols-5 gap-1 mb-2">
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols) + 1;
          const col = (index % cols) + 1;
          const isHighlighted =
            row <= hoveredSize.rows && col <= hoveredSize.cols;

          return (
            <div
              key={index}
              className={`w-8 h-8 border ${
                isHighlighted
                  ? 'bg-blue-100 border-blue-400'
                  : 'border-gray-300'
              }`}
              onMouseEnter={() => setHoveredSize({ rows: row, cols: col })}
              onClick={() => onSelect(row, col)}
            />
          );
        })}
      </div>
      <div className="text-sm text-center">
        {hoveredSize.rows > 0
          ? `${hoveredSize.rows} × ${hoveredSize.cols}`
          : 'Hover to select size'}
      </div>
    </div>
  );
};
