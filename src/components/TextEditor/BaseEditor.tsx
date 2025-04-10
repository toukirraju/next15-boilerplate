'use client';
import '@mantine/tiptap/styles.css';
import { Link } from '@mantine/tiptap';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { useCallback, useState, useRef } from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { Icon } from '@/components';

import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import ImageResize from 'tiptap-extension-resize-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
// import FontSize from '@tiptap/extension-font-size';
import Mention from '@tiptap/extension-mention';

import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import BaseToolbar from './Toolbar/BaseToolbar';
import { FontWeight } from './Extensions/fontWeight';
import { TableActions } from './Toolbar';
import { EditorStyles } from './EditorStyles';
import { MentionButton } from './Mention/MentionButton';
import { createMentionSuggestion } from './Mention/createMentionSuggestion';

interface Range {
  from: number;
  to: number;
}

const defContent = `
  <p>Write something...</p>

`;

type BaseEditorProps = {
  content?: string;
  withborder?: boolean;
  error?: boolean;
  mentions?: string[];
  onChangeHtml?: (value: string) => void;
  onChangeText?: (value: string) => void;
};

const BaseEditor = ({
  content = defContent,
  withborder = false,
  error = false,
  mentions,
  onChangeHtml,
  onChangeText,
}: BaseEditorProps) => {
  const [isClickedTable, setIsClickedTable] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  //  modified suggestion object that includes our custom rendering
  const customSuggestion = {
    ...createMentionSuggestion(mentions),
    char: '{',
    command: ({
      editor,
      range,
      props,
    }: {
      editor: Editor;
      range: Range;
      props: { id: string | null };
    }) => {
      // Delete the range that includes our trigger character
      editor
        .chain()
        .focus()
        .deleteRange(range)
        // Insert our custom node
        .insertContent({
          type: 'mentionButton',
          attrs: {
            id: props.id,
          },
        })
        .run();

      // Move the cursor after the inserted content
      window.setTimeout(() => {
        editor.commands.focus();
      }, 0);
    },
  };

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
      Mention.configure({
        suggestion: customSuggestion,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChangeHtml) onChangeHtml(editor.getHTML());
      if (onChangeText) onChangeText(editor.getText());
    },
  });

  const handleTableClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      let clickedElement = e.target as HTMLElement;

      // Find if a table was clicked
      let tableElement = null;
      let currentElement = clickedElement;

      while (currentElement && !tableElement) {
        if (currentElement.tagName === 'TABLE') {
          tableElement = currentElement;
        }
        currentElement = currentElement.parentElement as HTMLElement;
      }

      // If a table was found, update the position
      if (tableElement) {
        const rect = tableElement.getBoundingClientRect();
        const containerRect = (
          containerRef.current as unknown as HTMLElement
        ).getBoundingClientRect();

        // Set position to top-left of the table
        setMenuPosition({
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
        });
        setIsClickedTable(true);
      } else {
        setIsClickedTable(false);
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative rounded-md ${withborder ? 'border border-[#b5bcca73]' : ''
        } ${error ? 'border border-red-500' : ''}
      `}
    >
      <EditorStyles />
      {/* editor content */}
      <div onClick={handleTableClick}>
        <div className="sticky top-14 z-10 bg-white/30 backdrop-blur-lg rounded-t-md shadow-md">
          <BaseToolbar editor={editor} />
        </div>
        <div className="p-5">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* table menu  */}
      {isClickedTable && editor && (
        <div
          className="absolute z-[9999]"
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          <Menu withArrow position="top-start">
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                radius="xs"
                size="md"
                aria-label="Table Actions"
              >
                <Icon icon={'fe:elipsis-h'} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <TableActions editor={editor} />
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default BaseEditor;
