import { useCallback, useState } from 'react';
import { Icon } from '@/components';
import {
  ActionIcon,
  Menu,
  ColorSwatch,
  ColorPicker as MantineColorPicker,
  Button,
} from '@mantine/core';
import { Editor } from '@tiptap/react';

const ColorPicker = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  // Common colors for both text and background
  const colors = [
    '#25262b',
    '#868e96',
    '#fa5252',
    '#e64980',
    '#be4bdb',
    '#7950f2',
    '#4c6ef5',
    '#228be6',
    '#15aabf',
    '#12b886',
    '#40c057',
    '#82c91e',
    '#fab005',
    '#fd7e14',
  ];

  // States for custom color pickers
  const [customTextColor, setCustomTextColor] = useState('#000000');
  const [customBgColor, setCustomBgColor] = useState('#FFFF00');

  const setTextColor = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );

  const setBackgroundColor = useCallback(
    (color: string) => {
      editor.chain().focus().setHighlight({ color }).run();
    },
    [editor]
  );

  const getCurrentTextColor = () => {
    return editor.getAttributes('textStyle').color || '#000000';
  };

  const getCurrentBackgroundColor = () => {
    return editor.getAttributes('highlight').color || 'transparent';
  };

  return (
    <ActionIcon.Group>
      <Menu shadow="md" width={220} position="bottom-start">
        <Menu.Target>
          <ActionIcon
            variant={editor.isActive('textStyle') ? 'filled' : 'default'}
            size="md"
            aria-label="Text Color"
            radius="md"
            style={{ position: 'relative' }}
          >
            <Icon icon="ic:round-format-color-text" />
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                width: '14px',
                height: '4px',
                backgroundColor: getCurrentTextColor(),
                borderRadius: '1px',
              }}
            />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Text Color</Menu.Label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '5px',
              padding: '5px',
            }}
          >
            {colors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                onClick={() => setTextColor(color)}
                radius={6}
                size={24}
              />
            ))}
          </div>
          <Menu.Divider />
          <Menu.Label>Custom Color</Menu.Label>
          <div style={{ padding: '10px' }}>
            <MantineColorPicker
              format="hexa"
              value={customTextColor}
              onChange={setCustomTextColor}
              withPicker
              fullWidth
            />
            <Button
              fullWidth
              variant="light"
              onClick={() => setTextColor(customTextColor)}
              mt="sm"
            >
              Apply Custom Color
            </Button>
          </div>
        </Menu.Dropdown>
      </Menu>

      <Menu shadow="md" width={220} position="bottom-start">
        <Menu.Target>
          <ActionIcon
            variant={editor.isActive('highlight') ? 'filled' : 'default'}
            size="md"
            aria-label="Background Color"
            radius="md"
            style={{ position: 'relative' }}
          >
            <Icon icon="proicons:background-color" />
            <div
              style={{
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                height: '5px',
                backgroundColor: getCurrentBackgroundColor(),
                borderRadius: '1px',
              }}
            />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Background Color</Menu.Label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '5px',
              padding: '5px',
            }}
          >
            {colors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                onClick={() => setBackgroundColor(color)}
                radius={6}
                size={24}
              />
            ))}
          </div>
          <Menu.Divider />
          <Menu.Label>Custom Color</Menu.Label>
          <div style={{ padding: '10px' }}>
            <MantineColorPicker
              format="hexa"
              value={customBgColor}
              onChange={setCustomBgColor}
              withPicker
              fullWidth
            />
            <Button
              fullWidth
              variant="light"
              onClick={() => setBackgroundColor(customBgColor)}
              mt="sm"
            >
              Apply Custom Color
            </Button>
          </div>
        </Menu.Dropdown>
      </Menu>
    </ActionIcon.Group>
  );
};

export default ColorPicker;
