// Note-taking application using Chakra UI and React Icons
import { useState } from "react";
import { Box, Button, Textarea, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const toast = useToast();

  const handleAddNote = () => {
    if (currentNote.trim() === "") {
      toast({
        title: "Cannot add empty note",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, currentNote]);
    setCurrentNote("");
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    toast({
      title: "Note deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    handleDeleteNote(index);
  };

  return (
    <Box p={5}>
      <Textarea placeholder="Type your note here..." value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} mb={4} />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>
        Add Note
      </Button>
      <List spacing={3} mt={4}>
        {notes.map((note, index) => (
          <ListItem key={index} p={3} boxShadow="md" borderRadius="md" bg="gray.100">
            {note}
            <IconButton icon={<FaEdit />} colorScheme="yellow" size="sm" float="right" ml={2} onClick={() => handleEditNote(index)} aria-label="Edit note" />
            <IconButton icon={<FaTrash />} colorScheme="red" size="sm" float="right" onClick={() => handleDeleteNote(index)} aria-label="Delete note" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
