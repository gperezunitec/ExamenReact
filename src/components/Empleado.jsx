import {Entrada} from './Entrada.jsx'
import useEmpleado from "../hooks/useEmpleado.jsx";
import {useEffect} from "react";
import {toFormData} from "axios";

export const Empleado = () => {

    const {
        empleados,
        getEmpleados,
        openModal,
        id,
        setId,
        nombre,
        setNombre,
        dni,
        setDni,
        email,
        setEmail,
        direccion,
        setDireccion,
        titleModal,
        guardarEditarEmpleado,
        deleteEmpleado,
    }=useEmpleado();

    useEffect(() => {
        getEmpleados();

    },[])



    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">

                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEmpleado"
                                    onClick={() => openModal(1)}>
                                <i className="fa-solid fa-circle-plus"></i>Crear Empleado
                            </button>
                        </div>
                    </div>
                </div>


                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Dni</th>
                                <th>Email</th>
                                <th>Direccion</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">

                            {
                                empleados.map((empleado,i) => (
                                    <tr key={empleado.id}>
                                        <td>{i+1}</td>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.dni}</td>
                                        <td>{empleado.email}</td>
                                        <td>{empleado.role}</td>
                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEmpleado"
                                                    onClick={() => openModal(2,empleado)}>
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => deleteEmpleado(empleado.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }





                            </tbody>
                        </table>
                    </div>
                </div>


                <div id="modalEmpleado" className="modal fade" aria-hidden="true" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{titleModal}</label>
                            </div>
                            <div className="modal-body">


                                <Entrada id="nombre" iconName="fa-solid fa-gift" inputType="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}></Entrada>
                                <Entrada id="dni" iconName="fa-solid fa-gift" inputType="text" placeholder="Dni" value={dni} onChange={(e)=>setDni(e.target.value)}></Entrada>
                                <Entrada id="email" iconName="fa-solid fa-comments" inputType="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Entrada>
                                <Entrada id="role" iconName="fa-solid fa-dollar-sign" inputType="text" placeholder="Direccion" value={direccion} onChange={(e)=>setDireccion(e.target.value)}></Entrada>


                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={()=>guardarEditarEmpleado()}><i className="fa-solid fa-floppy-disk"></i>Guardar</button>
                                <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"></i>Cerrar</button>
                            </div>



                        </div>

                    </div>
                </div>





            </div>
        </>
    )

}