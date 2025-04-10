'use client';
import { Modal, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const InterceptedModal = ({ children }: { children: React.ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const handleModalClose = () => {
    close();
    router.back();
  };
  useEffect(() => {
    open();
  }, []);
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
