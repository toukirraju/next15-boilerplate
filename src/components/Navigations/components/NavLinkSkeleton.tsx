import { Group, Skeleton, Stack } from '@mantine/core';

const NavLinkSkeleton = () => {
  return (
    <Group align="center" className="p-3">
      {/* Avatar skeleton */}
      <Skeleton height={36} width={36} radius="xl" />

      {/* User info skeleton */}
      <Stack gap="sm">
        <Skeleton height={12} width={120} radius="sm" />
        <Skeleton height={8} width={60} radius="sm" />
      </Stack>
    </Group>
  );
};

export default NavLinkSkeleton;
