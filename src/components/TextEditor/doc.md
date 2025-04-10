# TextEditor Installation Guide

This guide will help you set up the TextEditor component using various Tiptap extensions.

## Prerequisites

Ensure you have Node.js and npm installed on your machine.

## Installation

1. **Initialize your project** (if you haven't already):

   ```bash
   npm init -y
   ```

2. **Install the required packages**:

   ```bash
   npm install @mantine/tiptap @tiptap/extension-bullet-list @tiptap/extension-color @tiptap/extension-font-size @tiptap/extension-highlight @tiptap/extension-image @tiptap/extension-link @tiptap/extension-list-item @tiptap/extension-mention @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-table @tiptap/extension-table-cell @tiptap/extension-table-header @tiptap/extension-table-row @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-underline @tiptap/react @tiptap/starter-kit @tiptap/suggestion tiptap-extension-resize-image
   ```

## Usage

1. **Import the necessary extensions and components** in your `TextEditor` component file:

   ```javascript
   import { useEditor, EditorContent } from '@tiptap/react';
   import StarterKit from '@tiptap/starter-kit';
   import BulletList from '@tiptap/extension-bullet-list';
   import Color from '@tiptap/extension-color';
   import FontSize from '@tiptap/extension-font-size';
   import Highlight from '@tiptap/extension-highlight';
   import Image from '@tiptap/extension-image';
   import Link from '@tiptap/extension-link';
   import ListItem from '@tiptap/extension-list-item';
   import Mention from '@tiptap/extension-mention';
   import Subscript from '@tiptap/extension-subscript';
   import Superscript from '@tiptap/extension-superscript';
   import Table from '@tiptap/extension-table';
   import TableCell from '@tiptap/extension-table-cell';
   import TableHeader from '@tiptap/extension-table-header';
   import TableRow from '@tiptap/extension-table-row';
   import TextAlign from '@tiptap/extension-text-align';
   import TextStyle from '@tiptap/extension-text-style';
   import Underline from '@tiptap/extension-underline';
   import ResizeImage from 'tiptap-extension-resize-image';
   ```

2. **Initialize the editor** with the desired extensions:

   ```javascript
   const editor = useEditor({
     extensions: [
       StarterKit,
       BulletList,
       Color,
       FontSize,
       Highlight,
       Image,
       Link,
       ListItem,
       Mention,
       Subscript,
       Superscript,
       Table,
       TableCell,
       TableHeader,
       TableRow,
       TextAlign,
       TextStyle,
       Underline,
       ResizeImage,
     ],
     content: '<p>Hello World!</p>',
   });
   ```

3. **Render the editor** in your component:

   ```javascript
   const TextEditor = () => {
     const editor = useEditor({
       extensions: [
         StarterKit,
         BulletList,
         Color,
         FontSize,
         Highlight,
         Image,
         Link,
         ListItem,
         Mention,
         Subscript,
         Superscript,
         Table,
         TableCell,
         TableHeader,
         TableRow,
         TextAlign,
         TextStyle,
         Underline,
         ResizeImage,
       ],
       content: '<p>Hello World!</p>',
     });

     return (
       <div>
         <EditorContent editor={editor} />
       </div>
     );
   };

   export default TextEditor;
   ```

You now have a fully functional TextEditor component with various Tiptap extensions installed and configured.
