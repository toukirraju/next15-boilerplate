'use client';
import { EditorContent, useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import TextStyle from '@tiptap/extension-text-style';

import Color from '@tiptap/extension-color';
// import FontSize from '@tiptap/extension-font-size';
import { Link } from '@mantine/tiptap';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import ImageResize from 'tiptap-extension-resize-image';

import { EditorStyles } from '../EditorStyles';
import { FontWeight } from '../Extensions/fontWeight';
import { MentionButton } from '../Mention/MentionButton';

const defContent = `
  <h2 style="text-align: center;">Welcome to Mantine rich text editor</h2>
  <p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p>
  <ul>
    <li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li>
    <li>Headings (h1-h6)</li>
    <li>Ordered and bullet lists</li>
    <li>Text align</li>
    <li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li>
  </ul>
`;

type BaseEditorProps = {
  content?: string;
};

const PagePreviewer = ({ content = defContent }: BaseEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      Highlight.configure({ multicolor: true }),
      // FontSize.configure({ types: ['textStyle'] }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontWeight.configure({ types: ['textStyle'] }),
      ImageResize,
      Table.configure({
        resizable: false,
        HTMLAttributes: {
          class: 'tableWrapper',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      MentionButton,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorStyles />
      {/* editor content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default PagePreviewer;
