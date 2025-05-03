import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserProfileButtons = () => {
  return (
    <div className="flex justify-end space-x-4">
      <button className="flex items-center space-x-2 text-orange-500 border border-orange-500 px-4 py-2 rounded">
        <FaUser />
        <span>Editar perfil</span>
      </button>
      <button className="flex items-center space-x-2 text-blue-500 border border-blue-500 px-4 py-2 rounded">
        <FaSignOutAlt />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default UserProfileButtons;
