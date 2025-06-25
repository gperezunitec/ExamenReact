import {Entrada} from './Entrada.jsx'
import useEmpleado from "../hooks/useEmpleado.jsx";
import {useEffect} from "react";
import {toFormData} from "axios";

export const Empleado = () => {

    const {
        products,
        getProducts,
        openModal,
        id,
        setId,
        name,
        setName,
        email,
        setEmail,
        role,
        setRole,
        titleModal,
        guardarEditarProducto,
        deleteProducto,
    }=useEmpleado();

    useEffect(() => {
        getProducts();

    },[])



    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">

                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto"
                                    onClick={() => openModal(1)}>
                                <i className="fa-solid fa-circle-plus"></i>Crear Producto
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
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">

                            {
                                products.map((product,i) => (
                                    <tr key={product.id}>
                                        <td>{i+1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.email}</td>
                                        <td>{product.role}</td>
                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto"
                                                    onClick={() => openModal(2,product)}>
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => deleteProducto(product.id)}>
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


                <div id="modalProducto" className="modal fade" aria-hidden="true" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{titleModal}</label>
                            </div>
                            <div className="modal-body">


                                <Entrada id="nombre" iconName="fa-solid fa-gift" inputType="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)}></Entrada>
                                <Entrada id="email" iconName="fa-solid fa-comments" inputType="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Entrada>
                                <Entrada id="role" iconName="fa-solid fa-dollar-sign" inputType="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)}></Entrada>


                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={()=>guardarEditarProducto()}><i className="fa-solid fa-floppy-disk"></i>Guardar</button>
                                <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"></i>Cerrar</button>
                            </div>



                        </div>

                    </div>
                </div>





            </div>
        </>
    )

}