import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';

const Typography = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={editor.isActive('italic') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icon icon="mingcute:italic-line" />
      </ActionIcon>

      <ActionIcon
        variant={editor.isActive('underline') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Icon icon="mingcute:underline-line" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive('strike') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icon icon="mingcute:strikethrough-line" />
      </ActionIcon>

      <ActionIcon
        variant={editor.isActive('strike') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="clear formatting"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <Icon icon="ic:round-format-clear" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Typography;
