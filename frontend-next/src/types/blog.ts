export interface Author {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  
 
  export interface Category {
    id: string;
    nombre: string;
    slug: string;
    color?: string;
    descripcion?: string;
    icono?: string | null;
    created_at?: string;
    updated_at?: string;
  }

export interface Tag {
    id: string;
    nombre: string;
    slug: string;
  }



export interface Article {
  id: string;
  autor: Author;
  categorias: Category[];
  etiquetas: Tag[];
  titulo: string;
  subtitulo: string;
  contenido: string;
  resumen: string;
  slug: string;
  fecha_publicacion: string;
  fecha_actualizacion: string;
  imagen_portada_url: string;
  tiempo_lectura: number;
  tiempo_lectura_minutos: string;
  visitas: number;
  imagen_descripcion?:any;
}
