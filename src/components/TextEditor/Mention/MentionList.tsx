import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface MentionListProps {
  items: string[];
  command: (props: { id: string }) => void;
  editor: any;
}

interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="bg-white/30 backdrop-blur-3xl rounded-md shadow-lg py-1 max-h-60 overflow-y-auto">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-500/50 focus:outline-none ${
                index === selectedIndex
                  ? 'bg-blue-50 text-blue-500 dark:bg-blue-500/30 dark:text-blue-50'
                  : 'dark:text-gray-800'
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <span style={{ color: '#3b82f6' }}>{`{{${item}}}`}</span>
            </button>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No result</div>
        )}
      </div>
    );
  }
);

export default MentionList;
