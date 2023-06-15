import { Box, Modal, Typography, Backdrop, Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface ModalTemplateProps {
  isModalOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  isModalOpen,
  handleClose,
  children,
  title,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h3'
            align='center'
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalTemplate;
