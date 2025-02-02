import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  VStack,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function Supplements() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [supplements, setSupplements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);

  const [formData, setFormData] = useState({
    supplement_name: '',
    nutrient_info: ''
  });

  // Fetch supplements on component mount
  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/supplements/user/1'); // Should be dynamic user ID
      setSupplements(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching supplements',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        user_id: '1', // Should be dynamic
        supplement_name: formData.supplement_name,
        nutrient_info: JSON.parse(formData.nutrient_info)
      };

      if (editingSupplement) {
        await axios.put(`http://localhost:3001/api/supplements/${editingSupplement.id}`, payload);
        toast({
          title: 'Supplement updated!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post('http://localhost:3001/api/supplements', payload);
        toast({
          title: 'Supplement added!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      setFormData({
        supplement_name: '',
        nutrient_info: ''
      });
      setEditingSupplement(null);
      onClose();
      fetchSupplements();
    } catch (error) {
      toast({
        title: editingSupplement ? 'Failed to update supplement' : 'Failed to add supplement',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (supplement) => {
    setEditingSupplement(supplement);
    setFormData({
      supplement_name: supplement.supplement_name,
      nutrient_info: JSON.stringify(supplement.nutrient_info, null, 2)
    });
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/supplements/${id}`);
      toast({
        title: 'Supplement deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchSupplements();
    } catch (error) {
      toast({
        title: 'Failed to delete supplement',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddNew = () => {
    setEditingSupplement(null);
    setFormData({
      supplement_name: '',
      nutrient_info: ''
    });
    onOpen();
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading>Fixed Supplements</Heading>
          <Button variant="solid" onClick={handleAddNew}>
            Add New Supplement
          </Button>
        </Box>

        {supplements.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text>No supplements added yet</Text>
          </Box>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Nutrient Information</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplements.map((supplement) => (
                <Tr key={supplement.id}>
                  <Td>{supplement.supplement_name}</Td>
                  <Td>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(supplement.nutrient_info, null, 2)}
                    </pre>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit supplement"
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => handleEdit(supplement)}
                    />
                    <IconButton
                      aria-label="Delete supplement"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(supplement.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {editingSupplement ? 'Edit Supplement' : 'Add New Supplement'}
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Supplement Name</FormLabel>
                    <Input
                      name="supplement_name"
                      value={formData.supplement_name}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Nutrient Information (JSON format)</FormLabel>
                    <Textarea
                      name="nutrient_info"
                      value={formData.nutrient_info}
                      onChange={handleChange}
                      placeholder='{"vitamins": [], "minerals": [], "other": []}'
                      minH="200px"
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  isLoading={isLoading}
                >
                  {editingSupplement ? 'Update' : 'Add'}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
} 