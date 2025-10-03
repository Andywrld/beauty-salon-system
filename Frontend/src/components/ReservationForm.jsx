// src/components/ReservationForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hook/useFetch';
import { useAvailability } from '../hook/useAvailability';
import { useCreateAppointment } from '../hook/crearReserva';
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationModal from '../ui/confirmGeneric';


export default function ReservationForm() {
  const { iduser } = useAuth();

  const [formData, setFormData] = useState({
    service: '',
    date: null,
    hour: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setOpen] = useState(false);

  // --- Servicios ---
  const { data: servicesData } = useFetch('/api/servicios/');
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (!servicesData) return;
    setServices(
      Array.isArray(servicesData)
        ? servicesData
        : Array.isArray(servicesData.results)
        ? servicesData.results
        : []
    );
  }, [servicesData]);

  // --- Citas existentes ---
  const { data: appointmentsData } = useFetch('/api/citas/');
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (!appointmentsData) return;
    setAppointments(
      Array.isArray(appointmentsData)
        ? appointmentsData
        : Array.isArray(appointmentsData.results)
        ? appointmentsData.results
        : []
    );
  }, [appointmentsData]);

  // Filtramos sólo las citas del usuario actual
  const userAppointments = appointments.filter((appt) => {
    if (appt.customer && typeof appt.customer === 'string') {
      return appt.customer.id === Number(iduser);
    }

    return appt.customer === Number(iduser);
  });

  // --- Selección múltiple ---
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  // --- Disponibilidad según servicio + fecha ---
  const isoDate = formData.date
    ? formData.date.toISOString().slice(0, 10)
    : null;
  const { data: hours = [] } = useAvailability(
    formData.service ? Number(formData.service) : undefined,
    isoDate
  );

  // --- Mutación crear cita ---
  const { mutateAsync: createAppointment, isLoading: creating } =
    useCreateAppointment();

  // --- Handlers form ---
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date, hour: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!iduser || !formData.service || !formData.date || !formData.hour) {
      return;
    }
    const selected = new Date(`${isoDate}T${formData.hour}:00`);
    if (selected < new Date()) return;

    const payload = {
      service: Number(formData.service),
      start: selected.toISOString(),
      customer: Number(iduser),
    };

    try {
      const newAppt = await createAppointment(payload, {
        onError: (error) => {
          console.log(error);
          throw error;
        },
        onSuccess: () => toast.success('Cita agregada '),
      });
      setAppointments((prev) => [...prev, newAppt]);
      setFormData({ service: '', date: null, hour: '' });
    } catch (err) {
      console.error('Error creando cita:', err);
    }
  };

  // --- Selección / eliminación ---
  const handleSelectAppointment = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    setAllSelected((prev) => !prev);
    setSelectedAppointments(
      !allSelected ? userAppointments.map((a) => a.id) : []
    );
  };
  const handleDeleteAppointments = () => {
    selectedAppointments.forEach((id) => {
      api
        .delete(`/citas/${id}/`)
        .then(() =>
          setAppointments((prev) => prev.filter((appt) => appt.id !== id))
        )
        .catch((err) => console.error('Error eliminando cita:', err));
    });
    setSelectedAppointments([]);
    setAllSelected(false);
    setOpen(false);
    toast.success('Cita eliminada correctamente');
  };

  return (
    <div className='min-h-screen bg-jetBlack py-16 px-6 flex items-center justify-center'>
      <div className='max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Formulario */}

        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            message={
              allSelected
                ? '¿Está seguro que desea eliminar su cita?'
                : '¿Está seguro que desea eliminar su cita? '
            }
            title={'Confirmar eliminación'}
            onConfirm={handleDeleteAppointments}
            onCancel={() => setOpen(false)}
          />
        )}
        <Toaster />
        <motion.div
          className='bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-3xl sm:text-4xl text-mustard font-serif font-bold text-center mb-6'>
            Reserva tu Cita
          </h2>
          <form onSubmit={handleSubmit} className='grid gap-4'>
            <select
              name='service'
              value={formData.service}
              onChange={handleChange}
              className='w-full p-3 rounded-lg bg-transparent border border-bronze text-lightGray'
              required
            >
              <option value=''>Selecciona un servicio</option>
              {services.map((srv) => (
                <option key={srv.id} value={srv.id} className='text-black'>
                  {srv.nombre} – ${srv.precio}
                </option>
              ))}
            </select>

            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat='dd/MM/yyyy'
              placeholderText='Selecciona un día'
              className='w-full p-3 rounded-lg bg-transparent border border-bronze text-lightGray'
              required
            />

            <select
              name='hour'
              value={formData.hour}
              onChange={handleChange}
              disabled={!hours.length}
              className='w-full p-3 rounded-lg bg-transparent border border-bronze text-lightGray'
              required
            >
              <option value=''>Horas disponibles de reservacion</option>
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <button
              type='submit'
              className='bg-mustard text-black font-bold py-3 rounded-lg shadow-md'
              disabled={creating || !iduser}
            >
              {creating
                ? 'Reservando...'
                : iduser
                ? 'Reservar Cita'
                : 'Cargando Cliente...'}
            </button>
          </form>
        </motion.div>

        {/* Lista de citas del usuario */}
        <div className='bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8'>
          <h3 className='text-2xl sm:text-3xl text-mustard font-serif font-bold mb-4'>
            Tus Citas
          </h3>

          {userAppointments.length === 0 ? (
            <p className='text-lightGray'>No tienes citas aún.</p>
          ) : (
            <>
              <ul className='space-y-4 max-h-80 overflow-y-auto'>
                {userAppointments.map((appt) => {
                  const srv = services.find(
                    (s) => s.id === Number(appt.service || appt.servicio_id)
                  );
                  return (
                    <li
                      key={appt.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedAppointments.includes(appt.id)
                          ? 'border-mustard bg-mustard text-jetBlack'
                          : 'border-bronze bg-jetBlack text-lightGray'
                      }`}
                      onClick={() => handleSelectAppointment(appt.id)}
                    >
                      <strong>
                        {srv ? srv.nombre : 'Servicio desconocido'}
                      </strong>{' '}
                      – {new Date(appt.start || appt.fecha).toLocaleString()}
                    </li>
                  );
                })}
              </ul>

              <div className='mt-4 flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={toggleSelectAll}
                  className='bg-mustard text-black font-bold py-3 px-4 rounded-lg shadow-md'
                >
                  {allSelected ? 'Deseleccionar Todas' : 'Seleccionar Todas'}
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className='border border-mustard bg-white bg-opacity-10 text-lightGray font-bold py-3 px-4 rounded-lg shadow-md'
                  disabled={selectedAppointments.length === 0}
                >
                  Eliminar Seleccionadas
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
