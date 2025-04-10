import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';

const Decorations = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={editor.isActive('bulletList') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Bulleted list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icon icon="fe:list-bullet" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive('orderedList') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icon icon="ri:list-ordered-2" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive('blockquote') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Blockquote"
        onClick={() => {
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <Icon icon="bi:blockquote-left" />
      </ActionIcon>

      <ActionIcon
        variant={editor.isActive('code') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Icon icon="mdi:code-tags" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Decorations;
