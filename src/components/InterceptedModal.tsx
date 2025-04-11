'use client';
import { Modal, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const InterceptedModal = ({ children }: { children: React.ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 480px)');

  // Store the initial path when modal opens
  const initialPath = useRef(pathname);

  const handleModalClose = () => {
    close();
    router.back();
  };

  useEffect(() => {
    open();
    // Update the initial path when modal opens
    initialPath.current = pathname;
  }, []);

  useEffect(() => {
    // Close the modal if the path changes from the initial path
    if (opened && pathname !== initialPath.current) {
      close();
    }
  }, [pathname, opened, close]);

  return (
    <Modal
      opened={opened}
      onClose={handleModalClose}
      fullScreen={isMobile}
      radius={15}
      scrollAreaComponent={ScrollArea.Autosize}
      size='md'
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 7,
      }}
    >
      <Modal.Body p={10} pt={10}>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default InterceptedModal;
