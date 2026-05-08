import Note from "../model/Note.js";

export async function getAllNotes(_,res) {  
   try{
      const notes = await  Note.find().sort({createdAt:-1}); //Newest First
      
      res.status(200).json(notes);

   } catch (error){
      console.error("Error in getAllNotes controller", error);
      res.status(500).json({message: "Internal Server Error"});
   }
};

export  async function getNoteById(req, res) {
   try {
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).json({message:"Note not found"});
      res.status(200).json(note);

   } catch (error) {
      console.error("Error in getNoteById controller", error);
      res.status(500).json({message: "Internal Server Error"});      
   }
   
}

export async function createNotes(req,res) {  
   try {
       const {title, content} = req.body;
       const newNote = new Note({title, content})
       
       const savedNote = await newNote.save()
      res.status(201).json(savedNote);
      
   } catch (error) {
       console.error("Error in createNotes controller", error)
      res.status(500).json({message: "Internal Server Error"})
      
   }  
};
export async function updateNotes(req,res) {  
    try {
      const{title,content} = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
         req.params.id,
         {title,content},
         {new: true}
      );
      if(!updatedNote) return res.status(404).json({message:"Note not found"});
      res.status(200).json({updatedNote});
   } catch (error) {
      console.error("Error in updateNotes controller", error)
      res.status(500).json({message: "Internal Server Error"})
      
   }
};

export async function deleteNotes(req,res) { 
    try {
      const deletedNote = await Note.findByIdAndDelete(
         req.params.id,);
      if(!deletedNote) return res.status(404).json({message:"Note not found"});
      res.status(200).json({message: "Note deleted sucessfully!"});
      
   } catch (error) {
      console.error("Error in deleteNotes controller", error);
      res.status(500).json({message: "Internal Server Error"});  
   } 
};
 
 