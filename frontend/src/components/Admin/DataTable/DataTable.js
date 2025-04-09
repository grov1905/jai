import React, { useState } from 'react';
import './DataTable.css';
import { useNavigate } from 'react-router-dom';

const DataTable = ({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onView, 
  editable = true, 
  deletable = true,
  viewable = false,
  detailPath
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filtrado de datos
  const filteredData = data.filter(item => 
    columns.some(column => 
      String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (item) => {
    if (detailPath) {
      navigate(`${detailPath}/${item.id}`);
    } else if (onView) {
      onView(item);
    }
  };

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="search-icon">search</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
              {(editable || deletable || viewable) && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`}>
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  {(editable || deletable || viewable) && (
                    <td className="actions-cell">
                      {viewable && (
                        <button 
                          onClick={() => handleView(item)}
                          className="action-btn view"
                          title="Ver"
                        >
                          visibility
                        </button>
                      )}
                      {editable && (
                        <button 
                          onClick={() => onEdit(item)}
                          className="action-btn edit"
                          title="Editar"
                        >
                          edit
                        </button>
                      )}
                      {deletable && (
                        <button 
                          onClick={() => onDelete(item)}
                          className="action-btn delete"
                          title="Eliminar"
                        >
                          delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + ((editable || deletable || viewable) ? 1 : 0)}>
                  No se encontraron registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;