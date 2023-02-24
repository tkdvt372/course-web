import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from './../../redux/actions/profile.js';
import { loadUser } from '../../redux/actions/user.js';
import { fileUploadCss } from '../Auth/Register';
import { toast } from 'react-hot-toast';
const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const {
    isOpen: isOpenImage,
    onClose: onCloseImage,
    onOpen: onOpenImage,
  } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onClose: onCloseCancel,
    onOpen: onOpenCancel,
  } = useDisclosure();
  const { loading, message, error } = useSelector(state => state.profile);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <Container minH={'95vh'} maxW="container.lg" py={8}>
      <Heading children="Hồ sơ" m="8" textTransform={'uppercase'} />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems="center"
        spacing={['8', '16']}
        padding={8}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button onClick={onOpenImage} colorScheme={'blue'} variant={'ghost'}>
            Chọn ảnh
          </Button>
        </VStack>
        <VStack spacing={4} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Tên" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="Ngày khởi tạo" fontWeight={'bold'} />
            <Text children={format(new Date(user.createdAt), 'dd/MM/yyyy')} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              {user.subscription && user.subscription.status === 'active' ? (
                <Stack>
                  <HStack>
                    <Text children="Thành viên:" fontWeight={'bold'} />
                    <Button
                      onClick={onOpenCancel}
                      isLoading={loading}
                      color={'blue.500'}
                      variant="unstyled"
                    >
                      Huỷ đăng ký
                    </Button>
                  </HStack>
                  <HStack>
                    <Text children="Ngày đăng ký:" fontWeight={'bold'} />

                    <Text
                      children={format(
                        new Date(user.subscription.createdTime),
                        'dd/MM/yyyy'
                      )}
                    />
                  </HStack>
                </Stack>
              ) : (
                <>
                  <Text children="Thành viên:" fontWeight={'bold'} />
                  <Link to="/subscribe">
                    <Button colorScheme={'blue'}>Đăng ký</Button>
                  </Link>
                </>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems="center">
            <Link to="/update-profile">
              <Button>Sửa thông tin</Button>
            </Link>
            <Link to="/change-password">
              <Button>Sửa mật khẩu</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Danh sách yêu thích" size="md" />
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems="center"
          flexWrap={'wrap'}
          p="4"
        >
          {user.playlist.map((elemnet, index) => (
            <VStack w={48} m="2" key={elemnet.course}>
              <Image
                boxSize={'full'}
                objectFit={'contain'}
                src={elemnet.poster}
              />
              <HStack>
                <Link to={`/course/${elemnet.course}`}>
                  <Button variant={'ghost'} colorScheme={'blue'}>
                    Xem ngay
                  </Button>
                </Link>
                <Button
                  isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(elemnet.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        isOpen={isOpenImage}
        onClose={onCloseImage}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
      />
      <CancelSubscription isOpen={isOpenCancel} onClose={onCloseCancel} />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Đổi ảnh đại điện</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'blue'}
                  type="submit"
                >
                  Thay đổi
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Huỷ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CancelSubscription({ isOpenCancel, onCloseCancel }) {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpenCancel}
      onClose={onCloseCancel}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bạn chắc chắn muốn huỷ gói thành viên?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text children="Bạn sẽ được hoàn lại 50% số tiền nếu huỷ trong vòng 7 ngày!" />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Chắc chắn
          </Button>
          <Button onClick={onCloseCancel}>Thoát</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
