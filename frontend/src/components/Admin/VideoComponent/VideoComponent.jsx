import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const VideoComponent = ({ node, updateAttributes }) => {
  const { 
    src, 
    type = 'local', 
    width = '100%', 
    height = 'auto', 
    controls = true, 
    youtubeId 
  } = node.attrs

  const renderVideo = () => {
    switch (type) {
      case 'youtube':
        return (
          <div className="video-iframe-container">
            <iframe
              width={width}
              height={height}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        )
      
      case 'github':
        return (
          <div className="video-player-container">
            <video
              width={width}
              height={height}
              controls={controls}
              preload="metadata"
            >
              <source src={src} type="video/mp4" />
              <track kind="captions" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        )
      
      case 'local':
      default:
        return (
          <div className="video-player-container">
            <video
              width={width}
              height={height}
              controls={controls}
              preload="metadata"
            >
              <source src={src} type="video/mp4" />
              <track kind="captions" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        )
    }
  }

  return (
    <NodeViewWrapper className="video-wrapper">
      {renderVideo()}
      <NodeViewContent />
    </NodeViewWrapper>
  )
}

export default VideoComponent