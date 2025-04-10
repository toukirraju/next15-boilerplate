import { useCallback } from 'react';
import { Icon } from '@/components';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { Editor } from '@tiptap/react';

const TextFormatting = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  // Font sizes
  const fontSizes = [
    { label: 'Small', value: '12px' },
    { label: 'Normal', value: '16px' },
    { label: 'Large', value: '20px' },
    { label: 'Huge', value: '24px' },
  ];

  // Font weights
  const fontWeights = [
    { label: 'Normal', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Semi-Bold', value: '600' },
    { label: 'Bold', value: '700' },
  ];

  const setFontSize = useCallback(
    (size: string) => {
      if (size === '16px') {
        editor.chain().focus().unsetFontSize().run();
      } else {
        editor.chain().focus().setFontSize(size).run();
      }
    },
    [editor]
  );

  const setFontWeight = useCallback(
    (weight: string) => {
      if (weight === '400') {
        editor.chain().focus().unsetFontWeight().run();
      } else {
        editor.chain().focus().setFontWeight(weight).run();
      }
    },
    [editor]
  );

  const getCurrentFontSize = () => {
    const attrs = editor.getAttributes('textStyle');
    return attrs.fontSize || '16px';
  };

  const getCurrentFontWeight = () => {
    const attrs = editor.getAttributes('textStyle');
    return attrs.fontWeight || '400';
  };

  return (
    <ActionIcon.Group>
      <Menu shadow="md" width={150} position="bottom-start">
        <Menu.Target>
          <ActionIcon
            variant={
              editor.isActive('textStyle', {
                fontWeight: getCurrentFontWeight(),
              }) && getCurrentFontWeight() !== '400'
                ? 'filled'
                : 'default'
            }
            size="md"
            aria-label="Font Weight"
            radius="md"
          >
            <Icon icon="mdi:format-bold" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Font Weight</Menu.Label>
          {fontWeights.map((weight) => (
            <Menu.Item
              key={weight.value}
              onClick={() => setFontWeight(weight.value)}
              style={{
                backgroundColor:
                  getCurrentFontWeight() === weight.value
                    ? '#f0f0f0'
                    : 'transparent',
                fontWeight: weight.value,
              }}
            >
              {weight.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <Menu shadow="md" width={150} position="bottom-start">
        <Menu.Target>
          <ActionIcon
            variant={
              editor.isActive('textStyle', {
                fontSize: getCurrentFontSize(),
              }) && getCurrentFontSize() !== '16px'
                ? 'filled'
                : 'default'
            }
            size="md"
            aria-label="Font Size"
            radius="md"
          >
            <Icon icon="fluent:text-font-size-24-regular" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Font Size</Menu.Label>
          {fontSizes.map((size) => (
            <Menu.Item
              key={size.value}
              onClick={() => setFontSize(size.value)}
              style={{
                backgroundColor:
                  getCurrentFontSize() === size.value
                    ? '#f0f0f0'
                    : 'transparent',
                fontWeight:
                  getCurrentFontSize() === size.value ? 'bold' : 'normal',
              }}
            >
              <Text
                size={
                  size.value === '12px'
                    ? 'xs'
                    : size.value === '20px'
                    ? 'lg'
                    : size.value === '24px'
                    ? 'xl'
                    : 'md'
                }
              >
                {size.label}
              </Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </ActionIcon.Group>
  );
};

export default TextFormatting;
