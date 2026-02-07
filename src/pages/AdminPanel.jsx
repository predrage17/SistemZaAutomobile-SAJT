// By: Predrag Savic 6153
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  FaTrash, FaPlus, FaCar, FaMoneyBillWave, FaChartLine, FaPen, 
  FaTimes, FaImage, FaInfoCircle, FaToggleOn, FaToggleOff, 
  FaExclamationTriangle, FaCheckCircle 
} from 'react-icons/fa';
import { Button, Input } from '../styles/global/SharedComponents';

// Import centralizovane konfiguracije i Loadera
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';
import Loader from '../components/Loader';

// Import stilova
import {
  PageWrapper,
  Header,
  DashboardGrid,
  Sidebar,
  StatCard,
  MainContent,
  Table,
  ActionButton,
  StyledSelect,
  ModalOverlay,
  ModalBox,
  SuccessBox,
  ModalActions,
  ConfirmButton,
  CancelButton,
  FormOverlay,
  FormHeader,
  FormSection,
  FormGroup,
  GridInputs
} from '../styles/pages/AdminPanel';

// --- VALIDACIJA ---
const schema = yup.object({
  brand: yup.string().required("Marka je obavezna"),
  model: yup.string().required("Model je obavezan"),
  year: yup.number().typeError("Mora biti broj").min(1900).max(2026).required(),
  price: yup.number().typeError("Mora biti broj").positive().required(),
  mileage: yup.number().typeError("Mora biti broj").min(0).required(),
  fuelType: yup.string().required("Gorivo je obavezno"),
  image: yup.string().url("Mora biti validan URL").required("Glavna slika je obavezna"),
  gallery1: yup.string().url("Mora biti URL").required("Slika galerije 1 je obavezna"),
  gallery2: yup.string().url("Mora biti URL").required("Slika galerije 2 je obavezna"),
  gallery3: yup.string().url("Mora biti URL").required("Slika galerije 3 je obavezna"),
  description: yup.string().required("Opis je obavezan"),
}).required();

const AdminPanel = () => {
  // --- STATE ---
  const [cars, setCars] = useState([]);
  const [fullData, setFullData] = useState({}); 
  const [loading, setLoading] = useState(true); // State za Loader
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null, item: null });
  const [successModal, setSuccessModal] = useState({ show: false, message: '' });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  /**
   * Dohvata sve podatke sa JSONBin-a koristeći centralizovanu konfiguraciju.
   */
  const fetchCars = () => {
    setLoading(true);
    axios.get(getFullUrl(), {
      headers: { 'X-Master-Key': API_CONFIG.API_KEY }
    })
    .then(res => {
      const data = res.data.record;
      setFullData(data); 
      setCars(data.cars || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Greška pri učitavanju:", err);
      setLoading(false);
    });
  };

  useEffect(() => { fetchCars(); }, []);

  /**
   * Ažuriranje cele baze putem PUT metode.
   */
  const updateRemoteDatabase = async (newCarsList) => {
    try {
      const payload = { ...fullData, cars: newCarsList };
      await axios.put(getUpdateUrl(), payload, {
        headers: getHeaders()
      });
      fetchCars(); 
    } catch (err) {
      console.error("Greška pri čuvanju:", err);
      alert("Greška pri povezivanju sa bazom.");
    }
  };

  const totalValue = cars.reduce((acc, car) => acc + Number(car.price), 0);
  const activeCount = cars.filter(car => car.isActive).length;

  const initiateDelete = (car) => {
    setConfirmModal({ show: true, type: 'delete', item: car });
  };

  const initiateToggle = (car) => {
    if (car.isActive) {
      setConfirmModal({ show: true, type: 'status', item: car });
    } else {
      executeToggle(car);
    }
  };

  const handleConfirmAction = async () => {
    let updatedList = [];
    if (confirmModal.type === 'delete') {
      updatedList = cars.filter(c => c.id !== confirmModal.item.id);
    } else if (confirmModal.type === 'status') {
      updatedList = cars.map(c => 
        c.id === confirmModal.item.id ? { ...c, isActive: !c.isActive } : c
      );
    }
    await updateRemoteDatabase(updatedList);
    setConfirmModal({ show: false, type: null, item: null });
  };

  const executeToggle = async (car) => {
    const updatedList = cars.map(c => 
      c.id === car.id ? { ...c, isActive: !c.isActive } : c
    );
    await updateRemoteDatabase(updatedList);
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
    setValue('brand', car.brand);
    setValue('model', car.model);
    setValue('year', car.year);
    setValue('price', car.price);
    setValue('mileage', car.mileage);
    setValue('fuelType', car.fuelType);
    setValue('image', car.image);
    setValue('description', car.description || "");
    
    const gallery = car.gallery || ["", "", ""];
    setValue('gallery1', gallery[0]);
    setValue('gallery2', gallery[1]);
    setValue('gallery3', gallery[2]);
  };

  const onSubmit = async (data) => {
    const carData = { 
      id: editingCar ? editingCar.id : Date.now(),
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: Number(data.price),
      mileage: Number(data.mileage),
      fuelType: data.fuelType,
      image: data.image,
      description: data.description,
      gallery: [data.gallery1, data.gallery2, data.gallery3],
      isActive: editingCar ? editingCar.isActive : true 
    };

    let updatedList;
    if (editingCar) {
      updatedList = cars.map(c => c.id === editingCar.id ? carData : c);
      setSuccessModal({ show: true, message: "Vozilo uspešno izmenjeno!" });
    } else {
      updatedList = [...cars, carData];
      setSuccessModal({ show: true, message: "Novo vozilo uspešno dodato!" });
    }

    await updateRemoteDatabase(updatedList);
    reset();
    setEditingCar(null);
    setShowForm(false);

    setTimeout(() => {
      setSuccessModal({ show: false, message: '' });
    }, 2000);
  };

  // PRIKAZ LOADERA DOK SE PODACI DOHVATAJU
  if (loading) return <PageWrapper><Loader /></PageWrapper>;

  return (
    <PageWrapper>
      <Header>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Pregled statistike i upravljanje inventarom</p>
        </div>
        {!showForm && (
          <Button onClick={() => { setEditingCar(null); reset(); setShowForm(true); }}>
            <FaPlus /> Dodaj Vozilo
          </Button>
        )}
      </Header>

      <DashboardGrid>
        <Sidebar>
          <StatCard>
            <div>
              <h4>Ukupno vozila</h4>
              <p>{cars.length}</p>
            </div>
            <div className="icon-box" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6'}}>
              <FaCar />
            </div>
          </StatCard>
          
          <StatCard>
            <div>
              <h4>Vrednost lagera</h4>
              <p>{totalValue.toLocaleString()} €</p>
            </div>
            <div className="icon-box" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}>
              <FaMoneyBillWave />
            </div>
          </StatCard>
          
          <StatCard>
            <div>
              <h4>Aktivni oglasi</h4>
              <p>{activeCount}</p>
            </div>
            <div className="icon-box" style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b'}}>
              <FaChartLine />
            </div>
          </StatCard>
        </Sidebar>

        <MainContent>
          {showForm ? (
            <FormOverlay>
              <FormHeader>
                <h3>{editingCar ? <><FaPen /> Izmeni Vozilo</> : <><FaPlus /> Dodaj Novo Vozilo</>}</h3>
                <button onClick={() => setShowForm(false)} style={{background: 'none', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>
                  <FaTimes />
                </button>
              </FormHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <FormSection>
                  <h4><FaInfoCircle /> Osnovne Informacije</h4>
                  <GridInputs>
                    <FormGroup><label>Marka</label><Input {...register("brand")} placeholder="npr. Audi" /><span>{errors.brand?.message}</span></FormGroup>
                    <FormGroup><label>Model</label><Input {...register("model")} placeholder="npr. A4" /><span>{errors.model?.message}</span></FormGroup>
                  </GridInputs>
                  <GridInputs>
                    <FormGroup>
                      <label>Tip Goriva</label>
                      <StyledSelect {...register("fuelType")}>
                        <option value="">Izaberite...</option>
                        <option value="Diesel">Diesel (Dizel)</option>
                        <option value="Petrol">Petrol (Benzin)</option>
                        <option value="Electric">Electric (Elektro)</option>
                      </StyledSelect>
                      <span>{errors.fuelType?.message}</span>
                    </FormGroup>
                    <FormGroup><label>Kilometraža (km)</label><Input type="number" {...register("mileage")} /><span>{errors.mileage?.message}</span></FormGroup>
                  </GridInputs>
                </FormSection>

                <FormSection>
                  <h4><FaMoneyBillWave /> Cena i Godište</h4>
                  <GridInputs>
                    <FormGroup><label>Godište</label><Input type="number" {...register("year")} /><span>{errors.year?.message}</span></FormGroup>
                    <FormGroup><label>Cena (€)</label><Input type="number" {...register("price")} /><span>{errors.price?.message}</span></FormGroup>
                  </GridInputs>
                </FormSection>

                <FormSection>
                  <h4><FaImage /> Galerija Slika</h4>
                  <FormGroup><label>Glavna Slika (URL)</label><Input {...register("image")} /><span>{errors.image?.message}</span></FormGroup>
                  <GridInputs>
                    <FormGroup><label>Galerija 1</label><Input {...register("gallery1")} /><span>{errors.gallery1?.message}</span></FormGroup>
                    <FormGroup><label>Galerija 2</label><Input {...register("gallery2")} /><span>{errors.gallery2?.message}</span></FormGroup>
                  </GridInputs>
                  <FormGroup><label>Galerija 3</label><Input {...register("gallery3")} /><span>{errors.gallery3?.message}</span></FormGroup>
                </FormSection>

                <FormGroup><label>Opis Vozila</label><textarea {...register("description")} rows="5" /><span>{errors.description?.message}</span></FormGroup>

                <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                  <Button type="submit" style={{flex: 1, padding: '15px', fontSize: '1rem'}}>{editingCar ? "Sačuvaj" : "Dodaj"}</Button>
                  <Button type="button" $variant="outline" onClick={() => setShowForm(false)} style={{padding: '15px', fontSize: '1rem'}}>Otkaži</Button>
                </div>
              </form>
            </FormOverlay>
          ) : (
            <div>
              <h3 style={{marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #333'}}>Inventar</h3>
              <div style={{overflowX: 'auto'}}>
                <Table>
                  <thead>
                    <tr>
                      <th style={{width: '100px'}}>Slika</th>
                      <th>Marka & Model</th>
                      <th>Godište</th>
                      <th>Status</th>
                      <th>Cena</th>
                      <th style={{textAlign: 'right'}}>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id}>
                        <td>
                          <img src={car.image} alt={car.model} onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/80x50/333/FFF?text=No+Img"}} />
                        </td>
                        <td>
                          <div style={{fontWeight: 'bold', fontSize: '1rem', color: 'white'}}>{car.brand}</div>
                          <div style={{fontSize: '0.85rem', color: '#9ca3af'}}>{car.model}</div>
                        </td>
                        <td style={{color: '#d1d5db', fontWeight: '500'}}>{car.year}.</td>
                        <td>
                          <span className={car.isActive ? "status-active" : "status-inactive"}>
                            {car.isActive ? "Aktivan" : "Skriven"}
                          </span>
                        </td>
                        <td className="price">{car.price.toLocaleString()} €</td>
                        <td style={{textAlign: 'right'}}>
                          <ActionButton onClick={() => initiateToggle(car)} $active={car.isActive} title={car.isActive ? "Sakrij oglas" : "Aktiviraj oglas"}>
                            {car.isActive ? <FaToggleOn size={22} /> : <FaToggleOff size={22} />}
                          </ActionButton>
                          <ActionButton $variant="edit" onClick={() => handleEdit(car)} title="Izmeni">
                            <FaPen style={{fontSize: '0.9rem'}} />
                          </ActionButton>
                          <ActionButton $variant="delete" onClick={() => initiateDelete(car)} title="Obriši">
                            <FaTrash style={{fontSize: '0.9rem'}} />
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {cars.length === 0 && (
                  <div style={{textAlign: 'center', padding: '60px', color: '#666', border: '1px dashed #333', borderRadius: '12px', marginTop: '20px'}}>
                    <p>Nema vozila u bazi.</p>
                    <Button onClick={() => setShowForm(true)} style={{marginTop: '15px'}}><FaPlus /> Dodaj Prvo Vozilo</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </MainContent>
      </DashboardGrid>

      {/* --- MODAL ZA POTVRDU --- */}
      {confirmModal.show && (
        <ModalOverlay onClick={() => setConfirmModal({ show: false, type: null, item: null })}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <FaExclamationTriangle className="warning-icon" />
            {confirmModal.type === 'delete' ? (
              <>
                <h3>Trajno brisanje?</h3>
                <p>Obrisaće se <strong>{confirmModal.item.brand} {confirmModal.item.model}</strong>. Akcija je nepovratna.</p>
              </>
            ) : (
              <>
                <h3>Sakriti oglas?</h3>
                <p>Kupci više neće videti ovaj automobil u ponudi.</p>
              </>
            )}
            <ModalActions>
              <CancelButton onClick={() => setConfirmModal({ show: false, type: null, item: null })}>Otkaži</CancelButton>
              <ConfirmButton onClick={handleConfirmAction}>
                {confirmModal.type === 'delete' ? "Da, obriši" : "Da, sakrij"}
              </ConfirmButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* --- SUCCESS MODAL --- */}
      {successModal.show && (
        <ModalOverlay>
          <SuccessBox>
            <FaCheckCircle className="success-icon" />
            <h3>Uspešno!</h3>
            <p>{successModal.message}</p>
          </SuccessBox>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default AdminPanel;