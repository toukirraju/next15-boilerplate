'use client';
import { Modal, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface InterceptedModalProps {
  children: React.ReactNode;
  modalPath: string;
}

const InterceptedModal = ({ children, modalPath }: InterceptedModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const handleModalClose = () => {
    close();
    router.back();
  };

  useEffect(() => {
    if (pathname === modalPath) {
      open();
    } else {
      close();
    }
  }, [pathname]); // 🔁 listens for every change in pathname

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
