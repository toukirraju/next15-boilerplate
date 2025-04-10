'use client';
import ToggleModeSwitch from '@/components/toggleModeSwitch';
import {
  Avatar,
  Flex,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const UserMenu = () => {

  return (
    <Menu
      trigger="click"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Group gap="xs" className="cursor-pointer">
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item>
          <Flex gap="xs" align="center">
            <UserInfo profile={null} />
          </Flex>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Application</Menu.Label>

        <Menu.Item
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>
          <Flex w={'100%'} justify="space-between" align="center">
            <Text fw={500} size="sm">
              Mode
            </Text>
            <ToggleModeSwitch />
          </Flex>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item color="red" component={'button'} >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;

const UserInfo = ({ profile }: { profile: any }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <Avatar size={40} src={profile?.avatar} radius={40} />
      {!isMobile && <Info profile={profile} />}
    </>
  );
};

const Info = ({ profile }: { profile: any }) => {
  return (
    <>
      {profile ? (
        <Stack gap={0}>
          <Text fz="sm" fw={500}>
            {profile?.name}
          </Text>
          <Text fz="xs" c="dimmed">
            {profile?.roles[0]}
          </Text>
        </Stack>
      ) : (
        <Stack gap="sm">
          <Skeleton height={8} width={60} />
          <Skeleton height={8} width={40} />
        </Stack>
      )}
    </>
  );
};
