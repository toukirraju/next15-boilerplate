import { Group } from '@mantine/core';
import RightMenus from './components/RightMenus';
import Logo from './Logo';

const TopNav = () => {
  return (
    <Group h="100%" w="100%" wrap="nowrap" justify="space-between">
      {/* left side */}
      <Group align="center" maw={300}>
        <Logo />
      </Group>
      {/* right side */}
      <Group align="center">
        <RightMenus />
      </Group>
    </Group>
  );
};

export default TopNav;
