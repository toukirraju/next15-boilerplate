import React from 'react';
import { Icon } from '@/components';
import { Editor } from '@tiptap/react';
import { ActionIcon, Flex } from '@mantine/core';
import TextFormatting from './TextFormatting';
import ColorPicker from './ColorPicker';
import Alignments from './Alignments';

const TableActions: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;

  const insertTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols }).run();
  };

  // Add column before
  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  // Add column after
  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  // remove column
  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  // Add row before
  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  // Add row after
  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  // remove row
  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  // toggle header row
  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  // toggle header column
  const toggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run();
  };

  // merge cells
  const mergeCells = () => {
    editor.chain().focus().mergeCells().run();
  };

  // split cell
  const splitCell = () => {
    editor.chain().focus().splitCell().run();
  };

  // delete table
  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  return (
    <Flex wrap="wrap" gap="xs" justify="center" maw={360}>
      <ActionIcon
        variant={editor.isActive('table') ? 'light' : 'default'}
        radius="md"
        size="md"
        aria-label="Insert Table"
        title="Insert table"
        onClick={() => insertTable(3, 3)}
      >
        <Icon icon={'majesticons:table-plus-line'} />
      </ActionIcon>
      {/* coloumns */}
      <ActionIcon.Group>
        {/* Add column before */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Add column before"
          title="Add column before"
          onClick={addColumnBefore}
        >
          <Icon icon={'mdi:table-column-plus-before'} />
        </ActionIcon>

        {/* Add column after */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Add column after"
          title="Add column after"
          onClick={addColumnAfter}
        >
          <Icon icon={'mdi:table-column-plus-after'} />
        </ActionIcon>

        {/* Delete column */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Delete column"
          title="Delete column"
          onClick={deleteColumn}
        >
          <Icon icon={'mdi:table-column-remove'} />
        </ActionIcon>
      </ActionIcon.Group>

      {/* rows */}
      <ActionIcon.Group>
        {/* Add row before */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Add row before"
          title="Add row before"
          onClick={addRowBefore}
        >
          <Icon icon={'mdi:table-row-plus-before'} />
        </ActionIcon>

        {/* Add row after */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Add row after"
          title="Add row after"
          onClick={addRowAfter}
        >
          <Icon icon={'mdi:table-row-plus-after'} />
        </ActionIcon>

        {/* Delete row */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Delete row"
          title="Delete row"
          onClick={deleteRow}
        >
          <Icon icon={'mdi:table-row-remove'} />
        </ActionIcon>
      </ActionIcon.Group>

      {/* header */}
      <ActionIcon.Group>
        {/* Toggle header row */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Toggle header row"
          title="Toggle header row"
          onClick={toggleHeaderRow}
        >
          <Icon icon={'fluent-mdl2:table-first-column'} />
        </ActionIcon>

        {/* Toggle header column */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Toggle header column"
          title="Toggle header column"
          onClick={toggleHeaderColumn}
        >
          <Icon icon={'fluent-mdl2:table-first-column'} className="rotate-90" />
        </ActionIcon>
      </ActionIcon.Group>

      {/* merge split */}
      <ActionIcon.Group>
        {/* Merge cells */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Merge cells"
          title="Merge cells"
          onClick={mergeCells}
        >
          <Icon icon={'fluent:table-cells-merge-28-regular'} />
        </ActionIcon>

        {/* Split cell */}
        <ActionIcon
          variant="default"
          radius="md"
          size="md"
          aria-label="Split cell"
          title="Split cell"
          onClick={splitCell}
        >
          <Icon icon={'fluent:table-cells-split-28-regular'} />
        </ActionIcon>
      </ActionIcon.Group>

      <TextFormatting editor={editor} />
      <ColorPicker editor={editor} />
      <Alignments editor={editor} />

      {/* delete table */}
      <ActionIcon
        variant="default"
        radius="md"
        size="md"
        aria-label="Delete table"
        title="Delete table"
        c="red"
        onClick={deleteTable}
      >
        <Icon icon={'flowbite:delete-table-outline'} />
      </ActionIcon>
    </Flex>
  );
};

export default TableActions;
