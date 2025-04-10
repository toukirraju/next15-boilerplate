import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { SuggestionProps } from '@tiptap/suggestion';
import { Editor } from '@tiptap/core';
import MentionList from './MentionList';

interface MentionSuggestionProps extends SuggestionProps {
  editor: Editor;
}

interface ReactRendererComponent {
  ref: {
    onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  } | null;
  updateProps: (props: MentionSuggestionProps) => void;
  element: HTMLElement;
  destroy: () => void;
}

// Create a factory function to generate the suggestion with custom items
export const createMentionSuggestion = (customItems: string[] = []) => {
  // Default items if no custom items are provided
  const defaultItems = [
    'Lea Thompson',
    'Cyndi Lauper',
    'Tom Cruise',
    'Madonna',
    'Jerry Hall',
    'Joan Collins',
    'Winona Ryder',
    'Christina Applegate',
    'Alyssa Milano',
    'Molly Ringwald',
    'Ally Sheedy',
    'Debbie Harry',
    'Olivia Newton-John',
    'Elton John',
    'Michael J. Fox',
    'Axl Rose',
    'Emilio Estevez',
    'Ralph Macchio',
    'Rob Lowe',
    'Jennifer Grey',
    'Mickey Rourke',
    'John Cusack',
    'Matthew Broderick',
    'Justine Bateman',
    'Lisa Bonet',
  ];

  // Use custom items if provided, otherwise use default items
  const itemsToUse = customItems.length > 0 ? customItems : defaultItems;

  return {
    char: '{',

    items: ({ query }: { query: string }) => {
      return itemsToUse
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRendererComponent;
      let popup: TippyInstance[];

      return {
        onStart: (props: MentionSuggestionProps) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          }) as unknown as ReactRendererComponent;

          if (!props.clientRect) {
            return;
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect as () => DOMRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },

        onUpdate(props: MentionSuggestionProps) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect as () => DOMRect,
          });
        },

        onKeyDown(props: { event: KeyboardEvent }) {
          if (props.event.key === 'Escape') {
            popup[0].hide();
            return true;
          }

          return component.ref?.onKeyDown(props) || false;
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  };
};
