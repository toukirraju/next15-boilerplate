// MentionButton.js with click event handling
import { Node, mergeAttributes } from '@tiptap/core';

export const MentionButton = Node.create({
  name: 'mentionButton',

  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'button[data-type="mention-button"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'button',
      mergeAttributes(
        {
          'data-type': 'mention-button',
          class:
            'bg-blue-100 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-200 font-medium',
        },
        HTMLAttributes
      ),
      `{{${node.attrs.id}}}`,
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('button');

      dom.setAttribute('data-type', 'mention-button');
      dom.classList.add(
        'bg-blue-100',
        'text-blue-600',
        'px-2',
        'py-1',
        'rounded',
        'hover:bg-blue-200',
        'font-medium'
      );
      dom.textContent = `{{${node.attrs.id}}}`;

      // Add click event handler
      dom.addEventListener('click', (event) => {
        // Prevent the editor from handling the click
        event.preventDefault();

        // You can implement custom functionality when the button is clicked
        // For example, show a modal, update data, etc.
        console.log(`Button clicked: ${node.attrs.id}`);

        // Example of how to replace the button with other content if needed
        // if (typeof getPos === 'function') {
        //   const pos = getPos();
        //   editor.chain().focus().insertContentAt(pos, 'Replacement content').run();
        // }
      });

      return {
        dom,
      };
    };
  },
});
