import { Link } from "react-router-dom";
import { Users, ShoppingBag, Calendar, Percent, Image, Star } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-64 bg-jetBlack h-full flex flex-col p-6 shadow-lg mt-20">
            <nav className="flex-1">
                <ul className="space-y-3">
                    <li>
                        <Link to="/dashboard/tusuario" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Users size={20} className="text-mustard" /> Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/ttrabajadores" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Users size={20} className="text-mustard" /> Trabajadores
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tproductos" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <ShoppingBag size={20} className="text-mustard" /> Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tservicios" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <ShoppingBag size={20} className="text-mustard" /> Servicios
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tcitas" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Calendar size={20} className="text-mustard" /> Citas
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tfotos" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Image size={20} className="text-mustard" /> Fotos
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tpromociones" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Percent size={20} className="text-mustard" /> Promociones
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/treseñas" className="flex items-center gap-2 p-3 rounded-md hover:bg-mustard/20 transition">
                            <Star size={20} className="text-mustard" /> Reseñas
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
