import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';

const Actions = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={editor.isActive('undo') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.commands.undo()}
      >
        <Icon icon="flowbite:undo-outline" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive('redo') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.commands.redo()}
      >
        <Icon icon="flowbite:redo-outline" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Actions;
