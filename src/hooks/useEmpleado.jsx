import {useState} from "react";
import axios from "axios";
import {alertaSucess, alertaError, alertaWarning} from "../alertas.js";
import Swal from "sweetalert2";

const useEmpleado = () => {
    const [empleados, setEmpleados] = useState([])
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [direccion, setDireccion] = useState('')
    const [operation, setOperation] = useState('')
    const url='https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado'


    const getEmpleados = async () => {
        const response = await axios.get(url)
        setEmpleados(response.data)

    }

    const openModal = (operation, empleado) => {
        setId('')
        setNombre('')
        setDni('')
        setEmail('')
        setDireccion('')

        if (operation === 1) {
            setTitleModal('Registrar Empleado')
        }else if (operation === 2) {
            setTitleModal('Editar Empleado')
            setId(empleado.id)
            setNombre(empleado.nombre)
            setDni(empleado.dni)
            setEmail(empleado.email)
            setDireccion(empleado.address)
        }

        setOperation(operation)

    }


    const enviarSolicitud = async(urlApi,metodo,parametros={}) => {
        let obj={
            method:metodo,
            url:urlApi,
            data:parametros,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }

        await axios(obj).then(()=>{
            let mensaje = ""
            if (metodo=='POST') {
                mensaje = "Se guardo el Empleado"
            }else if (metodo=='PUT') {
                mensaje = "Se edito el Empleado"
            }else if (metodo=='DELETE') {
                mensaje = "Se elimino el Empleado"
            }
            alertaSucess(mensaje)
            document.getElementById("btnCerrarModal").click()
            getEmpleados()
        }).catch(error=>{
            alertaError(error.response.data.message)
        })
    }




    const guardarEditarEmpleado = () => {
        let payload,metodo,urlAxios

        if (nombre ==='') {
            alertaWarning('Nombre en blanco',nombre)
        }else if(dni ==='') {
            alertaWarning('Dni en blanco')
        }
        else if(email ==='') {
            alertaWarning('Email en blanco')
        }
        else if(direccion === '') {
            alertaWarning('Direccion en blanco')
        }else{
            payload={
                nombre:nombre,
                dni:dni,
                direccion:address,
                email:email,
                password:12345,
                avatar: "https://i.imgur.com/LDOO4Qs.jpg",
                categoryId:1,
                images:['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            }
            if (operation === 1) {
                metodo='POST'
                urlAxios =url
            }else{
                metodo='PUT'
                urlAxios =`${url}/${id}`
            }

            enviarSolicitud(urlAxios,metodo,payload)
        }
    }


    const deleteEmpleado = async(id) => {
        Swal.fire({
            title:"Esta seguro de eliminar el Empleado?",
            icon: "question",
            text:"No habra marcha atras",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`,'DELETE')
            }
        }).catch(error => {
            alertaError(error)
        })
    }

    return {
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
    }


}

export default useEmpleado;