import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';

const Alignments = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={editor.isActive({ textAlign: 'left' }) ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="left align"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <Icon icon="akar-icons:text-align-left" />
      </ActionIcon>

      <ActionIcon
        variant={
          editor.isActive({ textAlign: 'center' }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="center align"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <Icon icon="akar-icons:text-align-center" />
      </ActionIcon>
      <ActionIcon
        variant={
          editor.isActive({ textAlign: 'justify' }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="justify align"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <Icon icon="akar-icons:text-align-justified" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive({ textAlign: 'right' }) ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="right align"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <Icon icon="akar-icons:text-align-right" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Alignments;
