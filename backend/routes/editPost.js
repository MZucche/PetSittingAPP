const express = require('express');
const router = express.Router();
const Post = require('../schema/post'); // Asegúrate de que esta ruta sea correcta
const authenticate = require('../auth/authenticate');

// Corrección: Añade 'next' como tercer parámetro
router.put('/:postId/state', (req, res, next) => {
    console.log(`Recibida solicitud PUT para actualizar el estado del post ${req.params.postId}`);
    next(); // Ahora 'next' está definido y puedes usarlo
}, authenticate, async (req, res) => {
    try {
        const { state } = req.body;
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verifica si el usuario autenticado es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para modificar este post' });
        }

        // Actualizar el estado
        post.State = state;

        await post.save();

        res.json({ message: 'Estado del post actualizado con éxito', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estado del post' });
    }
});

// Nueva ruta para eliminar un post
router.delete('/:postId', authenticate, async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verifica si el usuario autenticado es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este post' });
        }

        await Post.findByIdAndDelete(postId);

        res.json({ message: 'Post eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
});

module.exports = router;