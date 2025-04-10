import { Icon } from '@/components';
import { ActionIcon } from '@mantine/core';
import { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import TableController from '../Controller/TableController';

const Insertions = ({
  editor,
  children,
}: {
  editor: Editor | null;
  children?: React.ReactNode;
}) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    if (!editor) {
      return null;
    }
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  return (
    <ActionIcon.Group>
      <ActionIcon
        variant={editor.isActive('horizontalRule') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="Add hr line"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Icon icon={'bi:hr'} />
      </ActionIcon>
      <ActionIcon
        variant={'default'}
        radius="md"
        size="md"
        aria-label="Add Image"
        onClick={addImage}
      >
        <Icon icon={'mage:image'} />
      </ActionIcon>

      <TableController editor={editor} />

      <ActionIcon
        variant={editor.isActive('link') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="link"
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor
              .chain()
              .focus()
              .extendMarkRange('link')
              .setLink({ href: url })
              .run();
          }
        }}
      >
        <Icon icon="garden:link-stroke-12" />
      </ActionIcon>
      <ActionIcon
        variant={editor.isActive('strike') ? 'filled' : 'default'}
        radius="md"
        size="md"
        aria-label="remove link"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Icon icon="garden:link-remove-stroke-12" />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default Insertions;
