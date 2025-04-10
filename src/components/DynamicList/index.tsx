'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  Flex,
  Title,
  Text,
  ScrollArea,
  Checkbox,
  Loader,
  Alert,
  MantineColor,
} from '@mantine/core';
import { Icon } from '../Icons';
import { cn } from '@/lib';

export type ColumnConfig = {
  header: string;
  matcher: string;
  align?: 'left' | 'right' | 'center' | undefined;
  render?: (value: unknown, row: unknown) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
};

type PreSelectedConfig = {
  field: string; // Field to match (e.g., 'id', 'name')
  values: unknown[]; // Values to match in that field
};

type DynamicListProps = {
  data?: unknown[];
  columns: ColumnConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: (row: any) => React.ReactNode;
  onRowClick?: (row: unknown) => void;
  actionsWidth?: string;
  divider?: boolean;
  bordered?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  cellPadding?: number;
  cellpx?: number;
  cellpy?: number;
  cellpl?: number;
  cellpr?: number;
  cellpt?: number;
  cellpb?: number;
  rowPadding?: number;
  rowpx?: number;
  rowpy?: number;
  rowpl?: number;
  rowpr?: number;
  rowpt?: number;
  rowpb?: number;
  rowBg?: MantineColor;
  rowTextColor?: MantineColor;

  headerpy?: number;
  headerBg?: MantineColor;
  headerTextColor?: MantineColor;
  withCheckbox?: boolean;
  onCheckboxChange?: (selectedRows: unknown[]) => void;
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  scrollTWHeight?: string;
  preSelectedRows?: PreSelectedConfig;
  maxSelection?: number; //  for max selection
  onMaxSelectionExceeded?: () => void; // Optional callback for max selection
  showHeader?: boolean;
};

const DynamicList: React.FC<DynamicListProps> = ({
  data = [],
  columns,
  actions,
  onRowClick,
  actionsWidth,
  divider = false,
  bordered = false,
  rounded = 'sm',
  cellPadding,
  cellpx,
  cellpy,
  cellpl,
  cellpr,
  cellpt,
  cellpb,
  rowPadding,
  rowpx = 10,
  rowpy = 6,
  rowpl,
  rowpr,
  rowpt,
  rowpb,
  rowBg,
  rowTextColor,
  headerpy = 6,
  headerBg,
  headerTextColor,
  withCheckbox,
  onCheckboxChange,
  isLoading = false,
  error = null,
  emptyMessage = 'No data found',
  scrollTWHeight,
  preSelectedRows,
  maxSelection,
  onMaxSelectionExceeded,
  showHeader = true,
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [selectionExceeded, setSelectionExceeded] = useState(false);

  // pre-selected rows
  const determinePreSelectedRows = () => {
    if (!preSelectedRows) return new Set<number>();

    const { field, values } = preSelectedRows;
    const preSelected = new Set<number>();

    data.forEach((row, index) => {
      const rowValue = field
        .split('.')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        .reduce((acc, part) => acc?.[part], row);
      if (values.includes(rowValue)) {
        preSelected.add(index);
      }
    });

    return preSelected;
  };

  // Update selection when data or preSelectedRows change
  useEffect(() => {
    const preSelected = determinePreSelectedRows();
    setSelectedRows(preSelected);
    setSelectAll(preSelected.size === data.length);
  }, [data, preSelectedRows]);

  const getValue = (obj: unknown, matcher: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    return matcher.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked && maxSelection !== undefined && data.length > maxSelection) {
      // If trying to select more than max, select only max
      const limitedSelection = new Set(
        Array.from(data.keys()).slice(0, maxSelection)
      );
      setSelectedRows(limitedSelection);
      setSelectAll(false);

      // Trigger max selection callback
      onMaxSelectionExceeded?.();

      // Show selection exceeded state
      setSelectionExceeded(true);
      setTimeout(() => setSelectionExceeded(false), 3000);

      return;
    }

    setSelectAll(checked);
    if (checked) {
      setSelectedRows(new Set(data.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // Handle individual row checkbox
  const handleRowCheckbox = (rowIndex: number, checked: boolean) => {
    // If max selection is set and we're trying to add more rows
    if (
      checked &&
      maxSelection !== undefined &&
      selectedRows.size >= maxSelection
    ) {
      // Trigger max selection callback if provided
      onMaxSelectionExceeded?.();

      // Show selection exceeded state
      setSelectionExceeded(true);

      // Clear selection exceeded state after a short delay
      setTimeout(() => setSelectionExceeded(false), 3000);

      return; // Prevent further selection
    }

    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(rowIndex);
    } else {
      newSelectedRows.delete(rowIndex);
    }

    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === data.length);
  };

  // Update parent component with selected rows
  useEffect(() => {
    if (onCheckboxChange) {
      const selectedData = Array.from(selectedRows).map((index) => data[index]);
      onCheckboxChange(selectedData);
    }
  }, [selectedRows]);

  const renderCell = (column: ColumnConfig, row: unknown) => {
    if (column.render) {
      return column.render(getValue(row, column.matcher), row);
    }

    const value = getValue(row, column.matcher);

    if (
      typeof value === 'string' &&
      (column.matcher.toLowerCase().includes('color') ||
        column.matcher.toLowerCase().includes('bg'))
    ) {
      return (
        <div
          className="rounded-full"
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: value,
          }}
        />
      );
    }

    return (
      // <ScrollArea scrollbars="x" offsetScrollbars="x">
      <Text size="sm" fw={500} truncate>
        {value as string}
      </Text>
      // </ScrollArea>
    );
  };

  let content = null;
  // Render loading state
  if (isLoading && !error) {
    content = (
      <Card bg={'transparent'} className="w-full" p={0}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="py-16"
        >
          <Loader size="lg" />
          <Text size="sm" className="mt-4 text-gray-500">
            Loading data...
          </Text>
        </Flex>
      </Card>
    );
  }

  // Render error state
  if (error && !isLoading) {
    content = (
      <Card bg={'transparent'} className="w-full" p={0}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="py-16"
        >
          <Icon icon={'ic:twotone-circle'} className="text-red-500" />
          <Text size="sm" className="mt-4 text-red-500">
            {error}
          </Text>
        </Flex>
      </Card>
    );
  }

  // Render empty state
  if (!data || (data.length === 0 && !isLoading && !error)) {
    content = (
      <Card bg={'transparent'} className="w-full " p={0}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="py-16"
        >
          <Icon icon={'tabler:file-filled'} className="text-gray-400" />
          <Text size="sm" className="mt-4 text-gray-500">
            {emptyMessage}
          </Text>
        </Flex>
      </Card>
    );
  }

  const getColumnStyle = (column: ColumnConfig) => ({
    flex: column.width ? 'none' : 1,
    width: column.width,
    minWidth: column.minWidth || '100px',
    ...(column.maxWidth && { maxWidth: column.maxWidth }),
    display: 'flex',
    justifyContent:
      column.align === 'right'
        ? 'flex-end'
        : column.align === 'center'
          ? 'center'
          : 'flex-start',
    textAlign:
      column.align === 'right'
        ? 'right'
        : column.align === 'center'
          ? 'center'
          : 'left',
  });

  if (!isLoading && !error && data.length > 0) {
    content = (
      <ScrollArea
        className={cn('w-full', scrollTWHeight && scrollTWHeight)}
        type="auto"
      >
        {data?.map((row, rowIndex) => (
          <div className="my-2" key={rowIndex}>
            {/* ===============>> Mobile Row  <<=============== */}
            <Flex
              direction="column"
              className={cn(
                'md:!hidden  py-3 px-4 my-2',
                {
                  rounded: rounded !== 'none',
                  'rounded-sm': rounded === 'sm',
                  'rounded-md': rounded === 'md',
                  'rounded-lg': rounded === 'lg',
                  'rounded-xl': rounded === 'xl',
                },
                { border: bordered, 'border-gray-500/20': bordered }
              )}
              gap="md"
            >
              {withCheckbox && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.has(rowIndex)}
                    onChange={(event) =>
                      handleRowCheckbox(rowIndex, event.currentTarget.checked)
                    }
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
              )}
              {columns.map((column, colIndex) => (
                <Flex key={colIndex} justify="space-between" align="center">
                  <Title className="text-gray-500" size="sm" fw={500}>
                    {column.header}
                  </Title>
                  <ScrollArea.Autosize maw={300} mah={150}>
                    {renderCell(column, row)}
                  </ScrollArea.Autosize>
                </Flex>
              ))}
              {actions && (
                <Flex justify="space-between" align="center">
                  <Title className="text-gray-500" size="sm" fw={500} order={4}>
                    Actions
                  </Title>
                  <div>{actions(row)}</div>
                </Flex>
              )}
            </Flex>

            {/* ===============>> Desktop Row <<=============== */}
            <Flex
              p={rowPadding}
              px={rowpx}
              py={rowpy}
              pl={rowpl}
              pr={rowpr}
              pt={rowpt}
              pb={rowpb}
              bg={rowBg}
              c={rowTextColor}
              className={cn(
                'text-[var(--mantine-color-gray-outline)]',
                `!hidden md:!flex   ${data
                  ? 'hover:bg-gray-100 dark:hover:bg-gray-100/20 transition-colors'
                  : 'bg-gray-50'
                } ${onRowClick ? 'cursor-pointer' : ''}`,
                { 'divide-x-2': divider },
                {
                  rounded: rounded !== 'none',
                  'rounded-sm': rounded === 'sm',
                  'rounded-md': rounded === 'md',
                  'rounded-lg': rounded === 'lg',
                  'rounded-xl': rounded === 'xl',
                },
                { border: bordered, 'border-gray-500/20': bordered }
              )}
              align="center"
              gap="md"
              onClick={() => onRowClick?.(row)}
              style={{ minWidth: 'fit-content' }}
            >
              {withCheckbox && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ flex: 'none', width: '20px' }}
                >
                  <Checkbox
                    checked={selectedRows.has(rowIndex)}
                    onChange={(event) =>
                      handleRowCheckbox(rowIndex, event.currentTarget.checked)
                    }
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
              )}

              {columns.map((column, colIndex) => (
                <Flex
                  key={colIndex}
                  style={getColumnStyle(column) as React.CSSProperties}
                  p={cellPadding}
                  px={cellpx}
                  py={cellpy}
                  pl={cellpl}
                  pr={cellpr}
                  pt={cellpt}
                  pb={cellpb}
                >
                  {/* <ScrollArea mah={150}> */}
                  {renderCell(column, row)}
                  {/* </ScrollArea> */}
                </Flex>
              ))}

              {actions && (
                <Flex
                  justify="flex-end"
                  style={{
                    flex: 'none',
                    width: actionsWidth,
                    minWidth: '100px',
                  }}
                >
                  {actions(row)}
                </Flex>
              )}
            </Flex>
          </div>
        ))}
      </ScrollArea>
    );
  }

  return (
    <div className="w-full">
      {selectionExceeded && (
        <Alert
          icon={<Icon icon={'ic:twotone-circle'} />}
          title="Maximum Selection Limit"
          color="yellow"
          className="mb-4"
        >
          You can select a maximum of {maxSelection} items.
        </Alert>
      )}
      <ScrollArea className="w-full" type="auto">
        <Flex direction="column">
          {/* ===============>> Header Row - Desktop <<=============== */}
          {showHeader && (
            <Flex
              p={rowPadding}
              px={rowpx}
              py={headerpy}
              pl={rowpl}
              pr={rowpr}
              pt={rowpt}
              pb={rowpb}
              bg={headerBg || 'var(--mantine-color-gray-light-hover)'}
              c={headerTextColor || 'var(--mantine-color-gray-outline)'}
              className={cn(
                '!hidden md:!flex',
                {
                  'divide-x-2': divider,
                  rounded: rounded !== 'none',
                  'rounded-sm': rounded === 'sm',
                  'rounded-md': rounded === 'md',
                  'rounded-lg': rounded === 'lg',
                  'rounded-xl': rounded === 'xl',
                },
                { border: bordered, 'border-gray-500/20': bordered }
              )}
              align="center"
              gap="md"
            >
              {withCheckbox && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ flex: 'none', width: '20px' }}
                >
                  <Checkbox
                    indeterminate={
                      selectedRows.size > 0 && selectedRows.size < data.length
                    }
                    checked={selectAll}
                    onChange={(event) =>
                      handleSelectAll(event.currentTarget.checked)
                    }
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
              )}

              {columns.map((column, index) => (
                <Flex
                  key={index}
                  style={getColumnStyle(column) as React.CSSProperties}
                  p={cellPadding}
                  px={cellpx}
                  py={cellpy}
                  pl={cellpl}
                  pr={cellpr}
                  pt={cellpt}
                  pb={cellpb}
                >
                  <Title size="sm" fw={500}>
                    {column.header}
                  </Title>
                </Flex>
              ))}

              {actions && (
                <Flex
                  justify="flex-end"
                  style={{
                    flex: 'none',
                    width: actionsWidth,
                    minWidth: '100px',
                  }}
                >
                  <Title className="text-gray-500" size="sm" fw={500}>
                    Actions
                  </Title>
                </Flex>
              )}
            </Flex>
          )}

          {content}
        </Flex>
      </ScrollArea>
    </div>
  );
};

export default DynamicList;
