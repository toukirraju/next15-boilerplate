'use client';
import { Card, Group, Text, Title } from '@mantine/core';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex justify-center md:justify-end items-center pr-0 md:pr-30">
      {/* form content */}
      <Card
        // bg="var(--mantine-color-default-border)"
        shadow="sm"
        padding="xl"
        radius="xl"
        className="w-full max-w-[464px]"
      >
        {/* title & logo */}
        <Group justify="space-between">
          {pathname === '/signin' ? (
            <Title className="text-4xl font-bold" order={1}>
              Sign in
            </Title>
          ) : (
            <Title className="text-4xl font-bold" order={1}>
              Sign up
            </Title>
          )}

          <Image src="LogIn/Game.svg" width={50} height={50} alt="Game Logo" />
        </Group>
        <Group justify="flex-start">
          <Text size="sm">
            {pathname === '/signin' ? 'New user?' : 'Already have an account'}
          </Text>
          <Link
            href={pathname === '/signin' ? '/signup' : '/signin'}
            className="text-blue-400 text-xs hover:underline"
          >
            {pathname === '/signin' ? ' Create an account' : 'Signin now '}
          </Link>
        </Group>
        {children}
      </Card>
    </div>
  );
}

export default AuthLayout;
