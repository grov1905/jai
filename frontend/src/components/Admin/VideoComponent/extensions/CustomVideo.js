import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import VideoComponent from '../VideoComponent'

const CustomVideo = Node.create({
  name: 'customVideo',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: 'local',
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto',
      },
      controls: {
        default: true,
      },
      youtubeId: {
        default: null,
      }
    }
  },

  parseHTML() {
    return [{
      tag: 'div[data-video]',
      getAttrs: dom => ({
        src: dom.getAttribute('data-src'),
        type: dom.getAttribute('data-type') || 'local',
        width: dom.getAttribute('data-width') || '100%',
        height: dom.getAttribute('data-height') || 'auto',
        controls: dom.getAttribute('data-controls') !== 'false',
        youtubeId: dom.getAttribute('data-youtube-id')
      })
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', 
      {
        'data-video': '',
        'data-src': HTMLAttributes.src,
        'data-type': HTMLAttributes.type,
        'data-width': HTMLAttributes.width,
        'data-height': HTMLAttributes.height,
        'data-controls': HTMLAttributes.controls,
        'data-youtube-id': HTMLAttributes.youtubeId
      }
    ]
  },

  addCommands() {
    return {
      setVideo: options => ({ chain }) => {  // Cambiado de 'commands' a 'chain'
        return chain()
          .insertContent({
            type: this.name,
            attrs: options,
          })
          .run()  // El run() se llama aquí
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent, {
      className: 'video-node-view',
      as: 'div'
    })
  }
})

export default CustomVideo