import { Icon } from '@/components';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { useCallback } from 'react';

function ImageController() {
  const { editor } = useRichTextEditorContext();
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
    <RichTextEditor.Control
      onClick={addImage}
      aria-label="Insert image"
      title="Insert image"
    >
      <Icon icon={'mage:image'} />
    </RichTextEditor.Control>
  );
}

export default ImageController;
