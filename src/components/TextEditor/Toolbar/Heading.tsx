import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';

const Heading = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={
          editor.isActive('heading', { level: 1 }) ? 'filled' : 'default'
        }
        size="md"
        aria-label="H1"
        radius="md"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icon className="h-5 w-5 " icon="codex:h1" />
      </ActionIcon>

      <ActionIcon
        variant={
          editor.isActive('heading', { level: 2 }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="H2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icon className="h-5 w-5 " icon="codex:h2" />
      </ActionIcon>

      <ActionIcon
        variant={
          editor.isActive('heading', { level: 3 }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="H3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Icon className="h-5 w-5" icon="codex:h3" />
      </ActionIcon>
      <ActionIcon
        variant={
          editor.isActive('heading', { level: 4 }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="H4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Icon className="h-5 w-5" icon="codex:h4" />
      </ActionIcon>
      <ActionIcon
        variant={
          editor.isActive('heading', { level: 5 }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="H5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      >
        <Icon className="h-5 w-5" icon="codex:h5" />
      </ActionIcon>
      <ActionIcon
        variant={
          editor.isActive('heading', { level: 6 }) ? 'filled' : 'default'
        }
        radius="md"
        size="md"
        aria-label="H6"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      >
        <Icon className="h-5 w-5" icon="codex:h6" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Heading;
