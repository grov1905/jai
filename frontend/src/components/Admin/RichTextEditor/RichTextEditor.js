import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { mergeAttributes } from '@tiptap/core'
import CustomVideo from '../VideoComponent/extensions/CustomVideo' // Asegúrate de que la ruta sea correcta
import { useEffect } from 'react'
import './RichTextEditor.css'

// Extensión personalizada de Image con controles de tamaño
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: element => element.getAttribute('width') || '100%',
        renderHTML: attributes => {
          return { width: attributes.width }
        },
      },
      height: {
        default: 'auto',
        parseHTML: element => element.getAttribute('height') || 'auto',
        renderHTML: attributes => {
          return { height: attributes.height }
        },
      },
      style: {
        default: 'max-width: 100%; height: auto;',
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          return { style: attributes.style }
        },
      }
    }
  }
})

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomImage,
      CustomVideo, // Asegúrate de que esta extensión esté correctamente importada
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-blue-500 hover:underline'
        }
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      const width = window.prompt('Width (e.g., 100%, 500px):', '100%')
      const height = window.prompt('Height (e.g., auto, 300px):', 'auto')
      
      editor.chain().focus().setImage({ 
        src: url,
        width: width || '100%',
        height: height || 'auto'
      }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addVideo = () => {
    if (!editor) return
  
    const type = window.prompt('Enter video type (youtube/local/github):', 'youtube')
    
    if (type === 'youtube') {
      const youtubeId = window.prompt('Enter YouTube Video ID (e.g., dQw4w9WgXcQ):')
      if (youtubeId) {
        editor.commands.setVideo({  // Eliminado el .run() aquí
          type: 'youtube',
          youtubeId,
          width: '100%',
          height: '500px'
        })
      }
    } else {
      const src = window.prompt('Enter video URL:')
      if (src) {
        editor.commands.setVideo({  // Eliminado el .run() aquí
          type: type || 'local',
          src,
          width: '100%',
          height: 'auto',
          controls: true
        })
      }
    }
  }

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <div className="rich-text-editor">
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <span className="material-icons">format_bold</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <span className="material-icons">format_italic</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <span className="material-icons">format_underlined</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <span className="material-icons">strikethrough_s</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <span className="material-icons">title</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <span className="material-icons">format_list_bulleted</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <span className="material-icons">format_list_numbered</span>
        </button>
        <button onClick={setLink}>
          <span className="material-icons">link</span>
        </button>
        <button onClick={addImage}>
          <span className="material-icons">image</span>
        </button>
        <button onClick={addVideo}>
          <span className="material-icons">video_library</span>
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <span className="material-icons">undo</span>
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <span className="material-icons">redo</span>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor