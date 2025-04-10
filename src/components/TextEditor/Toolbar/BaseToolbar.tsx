import { Flex } from '@mantine/core';
import Heading from './Heading';
import Typography from './Typography';
import { Editor } from '@tiptap/react';
import ColorPicker from './ColorPicker';
import TextFormatting from './TextFormatting';
import Alignments from './Alignments';
import Insertions from './Insertions';
import Decorations from './Decorations';
import Actions from './Actions';

const BaseToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <Flex gap="xs" wrap="wrap" p={'xs'} justify={'center'}>
      <Heading editor={editor} />
      <TextFormatting editor={editor} />
      <ColorPicker editor={editor} />
      <Typography editor={editor} />
      <Alignments editor={editor} />
      <Decorations editor={editor} />
      <Insertions editor={editor} />
      <Actions editor={editor} />
    </Flex>
  );
};

export default BaseToolbar;
